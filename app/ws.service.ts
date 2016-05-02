import {Injectable, EventEmitter} from 'angular2/core';
import {Board} from './board/board';
import {Column} from './column/column';
import {Card} from './card/card';

declare var io;

@Injectable()
export class WebSocketService {
  socket: any;
  public onColumnAdd: EventEmitter<Column>;
  public onCardAdd: EventEmitter<Card>;
  public onColumnUpdate: EventEmitter<Column>;
  public onCardUpdate: EventEmitter<Card>;

  constructor() {
    this.onColumnAdd = new EventEmitter();
    this.onCardAdd = new EventEmitter();
    this.onColumnUpdate = new EventEmitter();
    this.onCardUpdate = new EventEmitter();
  }

  connect(){
    this.socket = io.connect('http://localhost:4000');

    this.socket.on('addColumn', data => {
      this.onColumnAdd.emit(<Column>data.column);
    });
    this.socket.on('addCard', data => {
      this.onCardAdd.emit(<Card>data.card);
    });
    this.socket.on('updateColumn', data => {
      this.onColumnUpdate.emit(<Column>data.column);
    });
    this.socket.on('updateCard', data => {
      this.onCardUpdate.emit(<Card>data.card);
    });
  }

  join(boardId: string) {
    this.socket.emit('joinBoard', boardId);
  }

  addColumn(boardId:string, column: Column){
    this.socket.emit('addColumn', { boardId: boardId, column: column });
  }

  addCard(boardId: string, card: Card) {
    this.socket.emit('addCard', { boardId: boardId, card: card });
  }

  updateColumn(boardId: string, column: Column) {
    this.socket.emit('updateColumn', { boardId: boardId, column: column });
  }

  updateCard(boardId: string, card: Card) {
    this.socket.emit('updateCard', { boardId: boardId, card: card });
  }
}