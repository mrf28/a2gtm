import {Injectable, OnInit} from 'angular2/core'
import {Column} from '../column/column'

var DEFAULT_COLUMNS: Column[] = [
    {title: "To do", order: 0, cards: [
        {title: "This is a card.", order: 0}
    ]},    
    {title: "Doing", order: 1, cards: []},    
    {title: "Done", order: 2, cards: []},    
]

@Injectable()
export class BoardService {
	getColumns(){
		return DEFAULT_COLUMNS;
	}
}