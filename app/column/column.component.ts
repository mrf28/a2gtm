import {Component, Input, OnInit, AfterViewInit, ElementRef, EventEmitter} from 'angular2/core';
import {Column} from './column';
import {Card} from '../card/card';
import {CardComponent} from '../card/card.component'
import {BoardService} from '../board/board.service';

declare var jQuery: any;

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

    public cardReorder: EventEmitter<any>;

    constructor(private el: ElementRef, private _boardService: BoardService) { 
        this.cardReorder = new EventEmitter();
        this.cardReorder.subscribe(event => this.updateCardsOrder(event));
    }

    ngOnInit(){
   
    }

    ngAfterViewInit(){
      let component = this;
      var startColumn;
      jQuery('.card-list').sortable({
        connectWith: ".card-list",
        placeholder: "card-placeholder",
        dropOnEmpty: true,
        tolerance: 'pointer',
        start: function(event, ui) {
          ui.placeholder.height(ui.item.outerHeight());
          startColumn = ui.item.parent();
        },
        stop: function(event, ui) {
            var senderColumnId = +startColumn.attr('column-id');
            var targetColumnId = +ui.item.closest('.card-list').attr('column-id');
            var cardId = +ui.item.find('.card').attr('card-id');
            var index = component.findCardIndex(cardId, ui.item.closest('.card-list'));

            component.cardReorder.emit({
                senderColumnId: senderColumnId,
                targetColumnId: targetColumnId,
                cardId: cardId,
                index: index,
                boardId: component.column.boardId
            });
        }
      });
      jQuery('.card-list').disableSelection();     
    }

    updateCardsOrder(event){
        console.log(event);
        this._boardService.reorderCard(event.cardId, event.targetColumnId, event.senderColumnId, event.index, event.boardId);
    }

    blurOnEnter(event) {
        if (event.keyCode === 13){
            event.target.blur();
        }
    } 

    updateColumn() {
        if (this.column.title && this.column.title.trim() !== '') 
        {
            this._boardService.updateColumn(this.column);
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
            let newCard = <Card>{ title: this.addCardText, order: parent.cards.length + 1, columnId: parent.id };
            parent.cards.push(newCard);
            this._boardService.addCard(newCard, this.column);
        }
        this.clearAddCard();
    }

    clearAddCard(){
        this.addingCard = false;
        this.addCardText = '';
    }

    private findCardIndex(cardId, columnEl){
        let i = 0;
        for (i = 0; i < columnEl.find('.card').length - 1; i++) {
            if (columnEl.find('.card')[i].getAttribute('card-id') == cardId){
                return i;
            }
         } 

        return i;
    }
}