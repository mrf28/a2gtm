import {Component, Input, ElementRef} from 'angular2/core';
import {Card} from './card';

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

    constructor(public el: ElementRef){}

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
        } else {
            this.card.title = this.currentTitle;
        }

        this.editingCard = false;
    }

}