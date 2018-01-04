import { Component, Input, OnInit, OnDestroy, AfterViewInit, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Board } from '../board/board';
import { Column } from '../column/column';
import { Card } from '../card/card';
import { BoardService } from './board.service';
import { ColumnService } from '../column/column.service';
import { WebSocketService } from '../ws.service';
import { ColumnComponent } from '../column/column.component';
import { OrderBy } from '../pipes/orderby.pipe';
import { Where } from '../pipes/where.pipe';
import { Router, Params, ActivatedRoute } from '@angular/router';

declare var jQuery: any;
var curYPos = 0,
  curXPos = 0,
  curDown = false;

@Component({
  selector: 'gtm-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit, OnDestroy {
  board: Board;
  addingColumn = false;
  addColumnText: string;
  editingTilte = false;
  currentTitle: string;
  boardWidth: number;
  columnsAdded: number = 0;

  constructor(public el: ElementRef,
    private _ws: WebSocketService,
    private _boardService: BoardService,
    private _columnService: ColumnService,
    private _router: Router,
    private _route: ActivatedRoute) {
  }

  ngOnInit() {
    this._ws.connect();
    this._ws.onColumnAdd.subscribe(column => {
      console.log('adding column from server');
      this.board.columns.push(column);
    });

    this._ws.onCardAdd.subscribe(card => {
      console.log('adding card from server');
      this.board.cards.push(card);
    });

    let boardId = this._route.snapshot.params['id'];

    //let boardId = this._routeParams.get('id');
    this._boardService.getBoardWithColumnsAndCards(boardId)
      .subscribe(data => {
        console.log(`joining board ${boardId}`);
        this._ws.join(boardId);
    
        this.board = data[0];
        this.board.columns = data[1];
        this.board.cards = data[2];
        document.title = this.board.title + " | Generic Task Manager";
        this.setupView();        
      });
  }

  ngOnDestroy(){
    console.log(`leaving board ${this.board._id}`);
    this._ws.leave(this.board._id);
  }

  setupView() {
    let component = this;
    setTimeout(function () {
      var startColumn;
      jQuery('#main').sortable({
        items: '.sortable-column',
        handler: '.header',
        connectWith: "#main",
        placeholder: "column-placeholder",
        dropOnEmpty: true,
        tolerance: 'pointer',
        helper : 'clone',
        start: function (event, ui) {
          ui.placeholder.height(ui.item.height());
          startColumn = ui.item.parent();
        },
        stop: function (event, ui) {
          var columnId = ui.item.find('.column').attr('column-id');

          component.updateColumnOrder({
            columnId: columnId
          });
        }
      }).disableSelection();

      //component.bindPane();;
      document.getElementById('content-wrapper').style.backgroundColor = '';
    }, 100);
  }

  bindPane() {
    let el = document.getElementById('content-wrapper');
    el.addEventListener('mousemove', function (e) {
      e.preventDefault();
      if (curDown === true) {
        el.scrollLeft += (curXPos - e.pageX) * .25;// x > 0 ? x : 0;
        el.scrollTop += (curYPos - e.pageY) * .25;// y > 0 ? y : 0;
      }
    });

    el.addEventListener('mousedown', function (e) {
      if (e.srcElement.id === 'main' || e.srcElement.id === 'content-wrapper') {
        curDown = true;
      }
      curYPos = e.pageY; curXPos = e.pageX;
    });
    el.addEventListener('mouseup', function (e) {
      curDown = false;
    });
  }

  updateBoard() {
    if (this.board.title && this.board.title.trim() !== '') {
      this._boardService.put(this.board);
    } else {
      this.board.title = this.currentTitle;
    }
    this.editingTilte = false;
    document.title = this.board.title + " | Generic Task Manager";
  }

  editTitle() {
    this.currentTitle = this.board.title;
    this.editingTilte = true;

    let input = this.el.nativeElement
      .getElementsByClassName('board-title')[0]
      .getElementsByTagName('input')[0];

    setTimeout(function () { input.focus(); }, 0);
  }

  updateColumnElements(column: Column) {
    let columnArr = jQuery('#main .column');
    let columnEl = jQuery('#main .column[columnid=' + column._id + ']');
    let i = 0;
    for (; i < columnArr.length - 1; i++) {
      column.order < +columnArr[i].getAttibute('column-order');
      break;
    }

    columnEl.remove().insertBefore(columnArr[i]);
  }

  updateColumnOrder(event) {
    let i: number = 0,
      elBefore: number = -1,
      elAfter: number = -1,
      newOrder: number = 0,
      columnEl = jQuery('#main'),
      columnArr = columnEl.find('.column');

    for (i = 0; i < columnArr.length - 1; i++) {
      if (columnEl.find('.column')[i].getAttribute('column-id') == event.columnId) {
        break;
      }
    }

    if (i > 0 && i < columnArr.length - 1) {
      elBefore = +columnArr[i - 1].getAttribute('column-order');
      elAfter = +columnArr[i + 1].getAttribute('column-order');

      newOrder = elBefore + ((elAfter - elBefore) / 2);
    }
    else if (i == columnArr.length - 1) {
      elBefore = +columnArr[i - 1].getAttribute('column-order');
      newOrder = elBefore + 1000;
    } else if (i == 0) {
      elAfter = +columnArr[i + 1].getAttribute('column-order');

      newOrder = elAfter / 2;
    }

    let column = this.board.columns.filter(x => x._id === event.columnId)[0];
    column.order = newOrder;
    this._columnService.put(column).then(res => {
      this._ws.updateColumn(this.board._id, column);
    });
  }


  blurOnEnter(event) {
    if (event.keyCode === 13) {
      event.target.blur();
    }
  }

  enableAddColumn() {
    this.addingColumn = true;
    let input = jQuery('.add-column')[0]
      .getElementsByTagName('input')[0];

    setTimeout(function () { input.focus(); }, 0);
  }

  addColumn() {
    let lastOrder = 0;
    
    if (this.board.columns.length){
      lastOrder = this.board.columns[this.board.columns.length-1].order;
    }

    let newColumn = <Column>{
      title: this.addColumnText,
      order: lastOrder + 1000,
      boardId: this.board._id
    };
    this._columnService.post(newColumn)
      .subscribe(column => {
        console.log('column added');
        this.addColumnText = '';
        this._ws.addColumn(this.board._id, column);
      });
  }

  addColumnOnEnter(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      if (this.addColumnText && this.addColumnText.trim() !== '') {
        this.addColumn();
      } else {
        this.clearAddColumn();
      }
    }
    else if (event.keyCode === 27) {
      this.clearAddColumn();
    }
  }

  addColumnOnBlur() {
    if (this.addColumnText && this.addColumnText.trim() !== '') {
      this.addColumn();
    }
    this.clearAddColumn();
  }

  clearAddColumn() {
    this.addingColumn = false;
    this.addColumnText = '';
  }


  addCard(card: Card) {
    this.board.cards.push(card);
  }

  foreceUpdateCards() {
    var cards = JSON.stringify(this.board.cards);
    this.board.cards = JSON.parse(cards);
  }


  onCardUpdate(card: Card) {
    this.foreceUpdateCards();
  }
}