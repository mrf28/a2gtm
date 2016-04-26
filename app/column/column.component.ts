import {Component, Input, OnInit, ElementRef} from 'angular2/core';
import {Column} from './column';
import {CardComponent} from '../card/card.component'

@Component({
    selector: 'gtm-column',
    templateUrl: 'app/column/column.component.html',
    styleUrls: ['app/column/column.component.css'],
    directives: [CardComponent]
})
export class ColumnComponent implements OnInit {
    @Input()
    column: Column;
    editingColumn = false;
    addingCard = false;
    addCardText: string;
    currentTitle: string;

    constructor(public el: ElementRef){}

    ngOnInit(){
    }

    blurOnEnter(event) {
        if (event.keyCode === 13){
            event.target.blur();
        }
    } 

    updateColumn() {
        if (this.column.title && this.column.title.trim() !== '') {
            this.editingColumn = false;
        } else {
            this.column.title = this.currentTitle;
            this.editingColumn = false;
        }
    }

    editColumn() {
        this.currentTitle = this.column.title;
        this.editingColumn = true;
        let input = this.el.nativeElement
                        .getElementsByClassName('column-header')[0]
                        .getElementsByTagName('input')[0];

        setTimeout(function() { input.focus(); }, 0);
    }

    enableAddCard() {
        this.addingCard = true;
        let input = this.el.nativeElement
            .getElementsByClassName('add-card')[0]
            .getElementsByTagName('input')[0];

        setTimeout(function() { input.focus(); }, 0);
    }

    addCard(parent: Column) {
        if (this.addCardText && this.addCardText.trim() !== ''){
            parent.cards.push({ title: this.addCardText, order: parent.cards.length + 1 });
        }
        this.clearAddCard();
    }

    clearAddCard(){
        this.addingCard = false;
        this.addCardText = '';
    }
}