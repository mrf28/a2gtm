export class Card {
	_id: string;
  title: string;
  columnId: string;
  boardId: string;
  order: number;
  description: string;
  labels: [{label: string, color: string}];
  checklists: [{title: string, description: string, done: boolean}];
}