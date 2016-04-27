import {Component, Input, OnInit, AfterViewInit} from 'angular2/core';
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
    columns: Column[];
    constructor(private _boardService: BoardService){}
    
    ngOnInit(){
        this.columns = this._boardService.getColumns('randomid');
        document.title = this.title + " | Generic Task Manager";
    }

    ngAfterViewInit(){
      jQuery('#main').sortable({
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
 }