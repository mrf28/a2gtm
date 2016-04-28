import {Component, Input, OnInit, AfterViewInit, ElementRef, EventEmitter} from 'angular2/core';
import {Board} from '../board/board';
import {Column} from '../column/column';
import {BoardService} from './board.service';
import {ColumnComponent} from '../column/column.component';

declare var jQuery: any;

@Component({
    selector: 'gtm-board',
    templateUrl: 'app/board/board.component.html',
    styleUrls: ['app/board/board.component.css'],
    directives: [ColumnComponent],
    providers: [BoardService]
})
export class BoardComponent implements OnInit {
    title: string = "This is a board";
    board: Board;
    addingColumn = false;
    addColumnText: string;

    public columnReorder: EventEmitter<any>;

    constructor(public el: ElementRef, private _boardService: BoardService){
        this.columnReorder = new EventEmitter();
        this.columnReorder.subscribe(event => this.updateColumnOrder(event));
    }
   

    ngOnInit(){
        this.board = this._boardService.getBoard('randomid');
        document.title = this.title + " | Generic Task Manager";
    }

    ngAfterViewInit(){
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
            stop: function(event, ui){
                var columnId = +ui.item.find('.column').attr('column-id');
                var index = component.findColumnIndex(columnId);

                component.columnReorder.emit({
                    columnId: columnId,
                    index: index,
                    boardId: component.board.id
                });
            }
        });
      jQuery('#main').disableSelection();     
    }

    updateColumnOrder(event){
        this._boardService.reorderColumn(event.columnId, event.index, event.boardId);
    }

    private findColumnIndex(columnId) {
        let i = 0, columnEl = jQuery('#main');
        for (i = 0; i < columnEl.find('.column').length - 1; i++) {
            if (columnEl.find('.column')[i].getAttribute('column-id') == columnId) {
                return i;
            }
        }

        return i;
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
        if (this.addColumnText && this.addColumnText.trim() !== '') {
            let newColumn = <Column>{ title: this.addColumnText,
                 order: this.board.columns.length + 1, 
                 boardId: this.board.id,
                 cards: []
             };
            //this.board.columns.push(newColumn);
            this._boardService.addColumn(newColumn);
        }
        this.clearAddColumn();
    }

    clearAddColumn() {
        this.addingColumn = false;
        this.addColumnText = '';
    }
 }