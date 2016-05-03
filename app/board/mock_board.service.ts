// import {Injectable} from 'angular2/core';
// import {Board} from '../board/board';
// import {Column} from '../column/column';
// import {Card} from '../card/card';

// var DEFAULT_COLUMNS: Column[] = [
//     {
//     	id: 1,
// 			title: "To do", 
// 			boardId: "randomid",
// 			order: 0, 
// 			cards: [
// 				{ id: 1, title: "This is a card.", order: 0, columnId: 1 }
// 			]
// 		},
//     { 
//     	id: 2, 
//     	title: "Doing", 
// 			boardId: "randomid",
// 			order: 1, 
// 	    cards: [] 
// 		},
//     { 
// 			id: 3,
//     	title: "Done", 
// 			boardId: "randomid",
// 			order: 2, 
//     	cards: [] 
//     },
// ];

// var DEFAULT_BOARD: Board = {
// 	id: "randomid",
// 	title: "This is a board",
// 	columns: DEFAULT_COLUMNS
// };

// @Injectable()
// export class BoardService {
// 	private lastColumnId: number;
// 	private lastCardId: number;
// 	private Boards: Board[];

// 	constructor(){
// 		this.lastColumnId = 3;
// 		this.lastCardId = 1;

// 		if (localStorage.hasOwnProperty("boards")) {
// 			this.Boards = this.getBoardsLocal();
// 		}
// 		else {
// 			this.Boards = [DEFAULT_BOARD];
// 			localStorage.setItem('boards', JSON.stringify(this.Boards));
// 		}

// 		this.lastColumnId = this.countColumns();
// 		this.lastCardId = this.countCards();
// 	}

// 	getBoards(boardId: string) {
		
// 		return this.Boards;
// 	}

// 	getBoard(boardId: string) {
// 		let board = this.Boards.filter(board => board.id === boardId)[0];
// 		return board;
// 	}

// 	getColumns(boardId: string){
// 		let board = this.Boards.filter(board => board.id === boardId)[0];
// 		return board.columns;
// 	}

// 	getCard(cardId: number){
// 		for (let b in this.Boards){
// 			for(let c in this.Boards[b].columns){
// 				for (let card in this.Boards[b].columns[c].cards){
//           if (this.Boards[b].columns[c].cards[card].id === cardId){
//             return this.Boards[b].columns[c].cards[card];
//           }
// 				}
// 			}
// 		}
// 	}

// 	updateBoard(board: Board){
// 		localStorage.setItem("boards", JSON.stringify(this.Boards));
// 	}

// 	addColumn(column: Column){
// 		let board = this.Boards.filter(board => board.id === column.boardId)[0];
// 		column.id = ++this.lastColumnId;

// 		board.columns.push(column);

// 		localStorage.setItem("boards", JSON.stringify(this.Boards));

// 		return true;
// 	}

// 	updateColumn(column: Column) {
// 		let board = this.Boards.filter(board => board.id === column.boardId)[0];

// 		let c = board.columns.filter(c => c.id === column.id)[0]

// 		c.title = column.title;

// 		console.log(JSON.stringify(this.Boards));

// 		localStorage.setItem("boards", JSON.stringify(this.Boards));

// 		return true;
// 	}

// 	addCard(card: Card, column: Column) {
// 		let board = this.Boards.filter(board => board.id === column.boardId)[0];
				
// 		let c = board.columns.filter(c => c.id === column.id)[0];
		
// 		card.id = ++this.lastCardId;

// 		c.cards.push(card);

// 		localStorage.setItem("boards", JSON.stringify(this.Boards));

// 		return true;
// 	}

// 	updateCard(card: Card) {
//     let c = this.getCard(card.id);

// 		c.title = card.title;
// 		c.order = card.order;
// 		c.columnId = card.columnId;

// 		localStorage.setItem("boards", JSON.stringify(this.Boards));

// 		return true;
// 	}

// 	reorderColumn(columnId, index, boardId) {
// 		let board = this.Boards.filter(x => x.id === boardId)[0];

// 		for (let i = board.columns.length - 1; i >= 0; i--) {
// 			let column = board.columns[i];
// 			if (column.id === columnId) {
// 				board.columns.splice(index, 0, board.columns.splice(i, 1)[0]);
// 			}
// 		}

// 		localStorage.setItem("boards", JSON.stringify(this.Boards));
// 	}

// 	reorderCard(cardId, targetColumnId, senderColumnId, index, boardId) {
// 		let board = this.Boards.filter(x => x.id === boardId)[0];
// 		let senderColumn: Column;
// 		let targetColumn: Column;

// 		for (let c in board.columns){
// 			if (board.columns[c].id == senderColumnId){
// 				senderColumn = board.columns[c];
// 			} else if (board.columns[c].id == targetColumnId) {
// 				targetColumn = board.columns[c];
// 			}
// 		}

// 	    targetColumn = targetColumn || senderColumn;

// 		let i = 0;
// 		if (targetColumnId !== senderColumnId){
// 			let currentCard: Card;
// 			for (let c in senderColumn.cards) {
// 				let card = senderColumn.cards[c];
// 				if (card.id === cardId){
// 					card.order = i;
// 					card.columnId = senderColumnId;
// 					currentCard = card;
// 					console.log(currentCard);
// 				} else {
// 					card.order = i++;
// 				}
// 			}

// 			console.log(currentCard, index);

// 			senderColumn.cards.splice(currentCard.order, 1);

// 			targetColumn.cards.splice(index, 0, currentCard);
// 		} else {
//       		for (i = targetColumn.cards.length - 1; i >= 0; i--) {
// 		        let card = targetColumn.cards[i];
// 		        if (card.id === cardId) {
// 		          targetColumn.cards.splice(index, 0, targetColumn.cards.splice(i, 1)[0]);
// 		        }
// 			}
// 		}
		
// 		i = 0;
// 		for (let c in targetColumn.cards) {
// 			let card = targetColumn.cards[c];
// 			card.order = i++;
// 	    }

// 		localStorage.setItem("boards", JSON.stringify(this.Boards));
// 	}

// 	private findColumnById(id: number, boards: Board[]): Column {
// 		for (let b in boards){
// 			let cols = boards[b].columns.filter(x => x.id == id);
// 			if (cols.length > 0){
// 				return cols[0];
// 			}
// 		}
// 	}

// 	private getBoardsLocal(): Board[]{
// 		return <Board[]>JSON.parse(localStorage['boards']);
// 	}

// 	private countCards(): number{
// 	    let i = 0;
// 	    this.Boards.filter(x => !!x.columns.filter(y => !!y.cards.filter(z => !!i++)));
// 	    return i;
// 	}

// 	private countColumns(): number {
// 	    let i = 0;
// 		this.Boards.filter(x => !!x.columns.filter(y => !!i++));
// 	    return i;
//   	}
// }
