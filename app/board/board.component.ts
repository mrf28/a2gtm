import {Component, Input, OnInit, AfterViewInit, ElementRef} from 'angular2/core';
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
    constructor(public el: ElementRef, private _boardService: BoardService){}
    
    ngOnInit(){
        this.board = this._boardService.getBoard('randomid');
        document.title = this.title + " | Generic Task Manager";
    }

    ngAfterViewInit(){
      jQuery('#main').sortable({
        items: '.sortable-column',
        handler: '.header',
        connectWith: "#main",
        placeholder: "column-placeholder",
        dropOnEmpty: true,
        tolerance: 'pointer',
        start: function(event, ui) {
          ui.placeholder.height(ui.item.find('.column').outerHeight());
        },
      });
      jQuery('#main').disableSelection();     
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
            this.board.columns.push(newColumn);
            this._boardService.addColumn(newColumn);
        }
        this.clearAddColumn();
    }

    clearAddColumn() {
        this.addingColumn = false;
        this.addColumnText = '';
    }
 }