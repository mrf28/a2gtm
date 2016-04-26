import {Injectable, OnInit} from 'angular2/core';
import {Board} from '../board/board';
import {Column} from '../column/column';
import {Card} from '../card/card';

var DEFAULT_COLUMNS: Column[] = [
    {
    	id: 1,
		title: "To do", 
		boardId: "randomid",
		order: 0, 
		cards: [
			{ id: 1, title: "This is a card.", order: 0 }
		]
	},
    { 
    	id: 2, 
    	title: "Doing", 
		boardId: "randomid",
		order: 1, 
	    cards: [] 
	},
    { 
		id: 3,
    	title: "Done", 
		boardId: "randomid",
		order: 2, 
    	cards: [] 
    },
];

var DEFAULT_BOARD: Board = {
	id: "randomid",
	title: "This is a board",
	columns: DEFAULT_COLUMNS
};

@Injectable()
export class BoardService {
	private lastColumnId: number;
	private lastCardId: number;

	constructor(){
		this.lastColumnId = 3;
		this.lastCardId = 1;

		if (!localStorage.hasOwnProperty("boards")) {
			localStorage.setItem('boards', JSON.stringify([DEFAULT_BOARD]));
		}
	}

	getBoards(boardId: string) {
		if (localStorage.hasOwnProperty("boards")) {
			let boards = this.getBoardsLocal();
			
			return boards;
		}
		else {
			localStorage.setItem('boards', JSON.stringify([DEFAULT_BOARD]));
		}

		return [DEFAULT_BOARD];
	}

	getBoard(boardId: string) {
		if (localStorage.hasOwnProperty("boards")) {
			let boards = this.getBoardsLocal();
			if (boards.length > 0) {
				let board = boards.filter(board => board.id === boardId)[0];
				return board;
			} else {
				localStorage.setItem('boards', JSON.stringify([DEFAULT_BOARD]));
				return DEFAULT_BOARD;
			}
		}

		return DEFAULT_BOARD;
	}

	getColumns(boardId: string){
		if (localStorage.hasOwnProperty("boards")) {
			let boards = this.getBoardsLocal(); 
			if (boards.length > 0){
				let board = boards.filter(board => board.id === boardId)[0];

				return board.columns;
			} else {
				return DEFAULT_COLUMNS;
			}
		}

		return DEFAULT_COLUMNS;
	}

	addColumn(column: Column){
		if (localStorage.hasOwnProperty("boards")) {
			let boards = this.getBoardsLocal();
			if (boards.length > 0) {
				let board = boards.filter(board => board.id === column.boardId)[0];
				column.id = ++this.lastColumnId;

				board.columns.push(column);

				localStorage.setItem("boards", JSON.stringify(boards));

				return true;
			} else {
				return false;
			}
		}
		return false;
	}

	updateColumn(column: Column) {
		if(localStorage.hasOwnProperty("boards")) {
			let boards = this.getBoardsLocal();
			if (boards.length > 0) {
				//let board = 
				let board = boards.filter(board => board.id === column.boardId)[0];

				let c = board.columns.filter(c => c.id === column.id)[0]

				c.title = column.title;

				console.log(JSON.stringify(boards));

				localStorage.setItem("boards", JSON.stringify(boards));

				return true;
			} else {
				return false;
			}
		}
		return false;
	}


	addCard(card: Card, column: Column) {
		if (localStorage.hasOwnProperty("boards")) {
			let boards = this.getBoardsLocal();
			if (boards.length > 0) {
				let board = boards.filter(board => board.id === column.boardId)[0];
				
				let c = board.columns.filter(c => c.id === column.id)[0];
				
				card.id = ++this.lastCardId;

				c.cards.push(card);

				localStorage.setItem("boards", JSON.stringify(boards));

				return true;
			} else {
				return false;
			}
		}
		return false;
	}

	updateCard(card: Card) {
		if (localStorage.hasOwnProperty("boards")) {
			let boards = this.getBoardsLocal();
			if (boards.length > 0) {
				let col = this.findColumnById(card.columnId, boards);

				let board = boards.filter(board => board.id === col.boardId)[0];

				let column = board.columns.filter(x => x.id === card.columnId)[0];
				
				let c = column.cards.filter(x => x.id === card.id)[0];

				c.title = card.title;
				c.order = card.order;
				c.columnId = card.columnId;

				localStorage.setItem("boards", JSON.stringify(boards));

				return true;
			} else {
				return false;
			}
		}
		return false;
	}


	private findColumnById(id: number, boards: Board[]): Column {
		for (let b in boards){
			let cols = boards[b].columns.filter(x => x.id == id);
			if (cols.length > 0){
				return cols[0];
			}
		}
	}

	private getBoardsLocal(): Board[]{
		return <Board[]>JSON.parse(localStorage.getItem("boards"));
	}
}
