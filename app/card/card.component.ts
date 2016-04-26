import {Component, Input, ElementRef} from 'angular2/core';
import {Card} from './card';
import {Column} from '../column/column';
import {BoardService} from '../board/board.service';

@Component({
    selector: 'gtm-card',
    templateUrl: 'app/card/card.component.html',
    styleUrls: ['app/card/card.component.css'],
})
export class CardComponent {
    @Input()
    card: Card;
    editingCard = false;
    currentTitle: string;

    constructor(private el: ElementRef, private _boardService: BoardService){}

    blurOnEnter(event) {
        if (event.keyCode === 13) {
            event.target.blur();
        }
    } 
    
    editCard() {
        this.editingCard = true;
        this.currentTitle = this.card.title;

        let textArea = this.el.nativeElement.getElementsByTagName('textarea')[0];
        
        setTimeout(function (){
            textArea.focus();
        }, 0);
    }

    updateCard() {
        if (this.card.title && this.card.title.trim() !== ''){
            this._boardService.updateCard(this.card);
        } else {
            this.card.title = this.currentTitle;
        }

        this.editingCard = false;
    }

}