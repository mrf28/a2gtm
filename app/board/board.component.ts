import {Component, Input, OnInit, AfterViewInit, ElementRef} from 'angular2/core';
import {Observable} from 'rxjs/Rx';
import {Board} from '../board/board';
import {Column} from '../column/column';
import {BoardService} from './board.service';
import {ColumnService} from '../column/column.service';
import {ColumnComponent} from '../column/column.component';

declare var jQuery: any;
var curYPos = 0,
  curXPos = 0,
  curDown = false;

@Component({
  selector: 'gtm-board',
  templateUrl: 'app/board/board.component.html',
  styleUrls: ['app/board/board.component.css'],
  directives: [ColumnComponent]
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
    private _boardService: BoardService,
    private _columnService: ColumnService) {
  }


  ngOnInit() {
    this._boardService.get('5724b493303c3b6c214e7c2b').subscribe(board => {
      this.board = board;
      document.title = this.board.title + " | Generic Task Manager";
      this.loadColumns();
    });
  }

  loadColumns() {
    this._boardService.getColumns(this.board._id).subscribe(cols => {
      this.board.columns = cols;
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
    //component.bindPane();;
  }

  bindPane(){
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
    this.boardWidth = ((this.board.columns.length + (this.columnsAdded > 0 ? 2 : 1)) * 280) + 10;
    document.getElementById('main').style.width = this.boardWidth + 'px';

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

  updateColumnOrder(event) {
    let i:number = 0, 
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
    } else if (i == 0){
      elAfter = +columnArr[i + 1].getAttribute('column-order');

      newOrder = elAfter / 2;
    }

    let column = this.board.columns.filter(x => x._id === event.columnId)[0]; 
    column.order = newOrder;
    this._columnService.put(column);
  }


  blurOnEnter(event) {
    if (event.keyCode === 13) {
      event.target.blur();
    }
  }

  enableAddColumn() {
    this.addingColumn = true;
    console.log(this.el);
    let input = jQuery('.add-column')[0]
      .getElementsByTagName('input')[0];

    setTimeout(function() { input.focus(); }, 0);
  }

  addColumn() {
    let newColumn = <Column>{
      title: this.addColumnText,
      order: (this.board.columns.length + 1),
      boardId: this.board._id,
      cards: []
    };
    this._columnService.post(newColumn)
      .subscribe(column => {
        this.board.columns.push(column)

        this.updateBoardWidth();
        this.addColumnText = '';
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

}