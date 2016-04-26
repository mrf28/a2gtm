import {Component, Input, OnInit} from 'angular2/core';
import {Column} from '../column/column';
import {BoardService} from './board.service';
import {ColumnComponent} from '../column/column.component';

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
        this.columns = this._boardService.getColumns();
        document.title = this.title + " | Generic Task Manager"
    }    
 }