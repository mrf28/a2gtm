import {Component, Input, OnInit, AfterViewInit, ElementRef} from 'angular2/core';
import {Column} from './column';
import {Card} from '../card/card';
import {CardComponent} from '../card/card.component'
import {ColumnService} from './column.service';
import {CardService} from '../card/card.service';

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

  constructor(private el: ElementRef,
    private _columnService: ColumnService,
    private _cardService: CardService) {
  }

  ngOnInit() {
    this._columnService.getCards(this.column._id)
      .subscribe(cards  => {
        this.column.cards = cards;
        this.setupView();
        for (var i in cards) {
          this._columnService.cards.push(cards[i]); 
        }
      });
  }

  setupView() {
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
        var senderColumnId = startColumn.attr('column-id');
        var targetColumnId = ui.item.closest('.card-list').attr('column-id');
        var cardId = ui.item.find('.card').attr('card-id');

        component.updateCardsOrder({
          columnId: targetColumnId || senderColumnId,
          cardId: cardId
        });
      }
    });
    jQuery('.card-list').disableSelection();
  }

  updateCardsOrder(event) {
    let cardArr = jQuery('[column-id=' + event.columnId + '] .card'),
      i: number = 0,
      elBefore:number = -1,
      elAfter: number = -1,
      newOrder: number = 0;

    for (i = 0; i < cardArr.length - 1; i++) {
      if (cardArr[i].getAttribute('card-id') == event.cardId) {
        break;
      }
    }

    if (cardArr.length > 1){
      if (i > 0 && i < cardArr.length - 1) {
        elBefore = +cardArr[i - 1].getAttribute('card-order');
        elAfter = +cardArr[i + 1].getAttribute('card-order');

        newOrder = elBefore + ((elAfter - elBefore) / 2);
      }
      else if (i == cardArr.length - 1) {
        elBefore = +cardArr[i - 1].getAttribute('card-order');
        newOrder = elBefore + 1000;
      } else if (i == 0) {
        elAfter = +cardArr[i + 1].getAttribute('card-order');

        newOrder = elAfter / 2;
      }
    } else {
      newOrder = 1000;
    }

    let card = this._columnService.cards.filter(x => x._id === event.cardId)[0];
    card.order = newOrder;
    card.columnId = event.columnId;
    this._cardService.put(card);
  }

  blurOnEnter(event) {
    if (event.keyCode === 13) {
      event.target.blur();
    }
  }

  addColumnOnEnter(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      this.updateColumn();
    } else if (event.keyCode === 27) {
      this.cleadAddColumn();
    }
  }

  addCard(){
    this.column.cards = this.column.cards || [];
    let newCard = <Card>{
      title: this.addCardText,
      order: (this.column.cards.length + 1) * 1000,
      columnId: this.column._id
    };
    this._cardService.post(newCard)
    .subscribe(card => this.column.cards.push(card) );
  }

  addCardOnEnter(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      if (this.addCardText && this.addCardText.trim() !== '') {
        this.addCard();
        this.addCardText = '';
      } else {
        this.clearAddCard();
      }
    } else if (event.keyCode === 27) {
      this.clearAddCard();
    }
  }

  updateColumn() {
    if (this.column.title && this.column.title.trim() !== '') {
      this._columnService.put(this.column);
      this.editingColumn = false;
    } else {
      this.cleadAddColumn();
    }
  }

  cleadAddColumn() {
    this.column.title = this.currentTitle;
    this.editingColumn = false;
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

  addCardOnBlur() {
    if (this.addingCard){
      if (this.addCardText && this.addCardText.trim() !== '') {
        this.addCard();
      }
    }
    this.clearAddCard();
  }

  clearAddCard() {
    this.addingCard = false;
    this.addCardText = '';
  }

  private findCardIndex(cardId, columnEl) {
    let i = 0;
    for (i = 0; i < columnEl.find('.card').length - 1; i++) {
      if (columnEl.find('.card')[i].getAttribute('card-id') == cardId) {
        return i;
      }
    }

    return i;
  }
}