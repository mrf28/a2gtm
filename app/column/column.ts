import {Card} from '../card/card';

export class Column {
	id: number;
    title: string;
    boardId: string;
    order: number;
    cards: Card[];
}
