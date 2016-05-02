import {Component, Input, OnInit, AfterViewInit, ElementRef} from 'angular2/core';
import {Observable} from 'rxjs/Rx';
import {Board} from '../board/board';
import {Column} from '../column/column';
import {Card} from '../card/card';
import {BoardService} from './board.service';
import {ColumnService} from '../column/column.service';
import {WebSocketService} from '../ws.service';
import {ColumnComponent} from '../column/column.component';
import {OrderBy} from '../pipes/orderby.pipe';
import {Where} from '../pipes/where.pipe';


declare var jQuery: any;
var curYPos = 0,
  curXPos = 0,
  curDown = false;

@Component({
  selector: 'gtm-board',
  templateUrl: 'app/board/board.component.html',
  styleUrls: ['app/board/board.component.css'],
  directives: [ColumnComponent],
  pipes: [OrderBy, Where]
})
export class BoardComponent implements OnInit {
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
    private _columnService: ColumnService) {
  }

  ngOnInit() {
    this._ws.connect();
    this._ws.onColumnAdd.subscribe(column => {
      this.board.columns.push(column);
      this.updateBoardWidth();
    });

    // this._ws.onColumnUpdate.subscribe(column => {
    //   console.log(column, this.board.columns.filter(c => c._id === column._id)[0]);
    //   this.board.columns.filter(c => c._id === column._id)[0] = column;
    // });

    this._ws.onCardUpdate.subscribe(card => {
      this.board.cards.filter(c => c._id === card._id)[0] = card;
      this.foreceUpdateCards();
    });

    this._ws.onCardAdd.subscribe(card => {
        this.board.cards.push(card);
    });

    this._boardService.get('5724b493303c3b6c214e7c2b').subscribe(board => {
      this.board = board;
      document.title = this.board.title + " | Generic Task Manager";
      this._ws.join(this.board._id);
      this.loadColumns();
    });
  }

  loadColumns() {
    this._boardService.getColumns(this.board._id).subscribe(cols => {
      this.board.columns = cols;
      this.loadCards();
    });
  }

  loadCards(){
    this._boardService.getCards(this.board._id).subscribe(cards => {
      this.board.cards = cards;
      this.setupView();
    });
  }

  setupView() {
    let component = this;
    var startColumn;
    jQuery('#main').sortable({
      items: '.sortable-column',
      handler: '.header',
      connectWith: "#main",
      placeholder: "column-placeholder",
      dropOnEmpty: true,
      tolerance: 'pointer',
      start: function(event, ui) {
        ui.placeholder.height(ui.item.find('.column').outerHeight());
        startColumn = ui.item.parent();
      },
      stop: function(event, ui) {
        var columnId = ui.item.find('.column').attr('column-id');

        component.updateColumnOrder({
          columnId: columnId
        });
      }
    });

    component.updateBoardWidth();

    window.addEventListener('resize', function(e) {
      component.updateBoardWidth();
    });
    //component.bindPane();;
  }

  bindPane() {
    // let el = document.getElementById('content-wrapper');
    // el.addEventListener('mousemove', function(e) {
    //   e.preventDefault();
    //   if (curDown === true) {
    //     el.scrollLeft += (curXPos - e.pageX) * .25;// x > 0 ? x : 0;
    //     el.scrollTop += (curYPos - e.pageY) * .25;// y > 0 ? y : 0;
    //   }
    // });

    // el.addEventListener('mousedown', function(e) { 
    //   curDown = true; curYPos = e.pageY; curXPos = e.pageX; 
    // });
    // el.addEventListener('mouseup', function(e) { 
    //   curDown = false; 
    // });
  }

  updateBoardWidth() {
    // this.boardWidth = ((this.board.columns.length + (this.columnsAdded > 0 ? 1 : 2)) * 280) + 10;
    this.boardWidth = ((this.board.columns.length + 1) * 280) + 10;

    if (this.boardWidth > document.body.scrollWidth) {
      document.getElementById('main').style.width = this.boardWidth + 'px';
    } else {
      document.getElementById('main').style.width = '100%';
    }

    if (this.columnsAdded > 0) {
      let wrapper = document.getElementById('content-wrapper');
      wrapper.scrollLeft = wrapper.scrollWidth;
    }

    this.columnsAdded++;
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

    setTimeout(function() { input.focus(); }, 0);
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

    setTimeout(function() { input.focus(); }, 0);
  }

  addColumn() {
    let newColumn = <Column>{
      title: this.addColumnText,
      order: (this.board.columns.length + 1) * 1000,
      boardId: this.board._id,
      //cards: []
    };
    this._columnService.post(newColumn)
      .subscribe(column => {
        this.board.columns.push(column)
        console.log('column added');
        this.updateBoardWidth();
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
    console.log(card);
    this.board.cards.push(card);
  }

  foreceUpdateCards(){
    var cards = JSON.stringify(this.board.cards);
    this.board.cards = JSON.parse(cards);
  }


  onCardUpdate(card: Card) {
    this.foreceUpdateCards();
  }
}