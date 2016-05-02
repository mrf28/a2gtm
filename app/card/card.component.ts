import {Component, OnInit, Input, Output, EventEmitter, ElementRef, ChangeDetectorRef, NgZone} from 'angular2/core';
import {Card} from './card';
import {Column} from '../column/column';
import {CardService} from './card.service';
import {WebSocketService} from '../ws.service';

@Component({
  selector: 'gtm-card',
  templateUrl: 'app/card/card.component.html',
  styleUrls: ['app/card/card.component.css'],
})
export class CardComponent implements OnInit {
  @Input()
  card: Card;
  @Output() cardUpdate: EventEmitter<Card>;
  editingCard = false;
  currentTitle: string;
  zone: NgZone;
  constructor(private el: ElementRef,
    private _ref: ChangeDetectorRef,
    private _ws: WebSocketService,
    private _cardService: CardService) {
    this.zone = new NgZone({ enableLongStackTrace: false });
    this.cardUpdate = new EventEmitter();
  }

  ngOnInit() {
    this._ws.onCardUpdate.subscribe((card: Card) => {
      // this.zone.run(() => {
        console.log('card update on card component', this.card, card);
        if (this.card._id === card._id) {
          this.card.columnId = card.columnId;
          this.card.order = card.order;
          this.card.title = card.title;
          // this._ref.markForCheck();
          this.cardUpdate.emit(card);
        }
      });
    // });
  }

  blurOnEnter(event) {
    if (event.keyCode === 13) {
      event.target.blur();
    } else if (event.keyCode === 27) {
      this.card.title = this.currentTitle;
      this.editingCard = false;
    }
  }

  editCard() {
    this.editingCard = true;
    this.currentTitle = this.card.title;

    let textArea = this.el.nativeElement.getElementsByTagName('textarea')[0];

    setTimeout(function() {
      textArea.focus();
    }, 0);
  }

  updateCard() {
    if (!this.card.title || this.card.title.trim() === '') {
      this.card.title = this.currentTitle;
    }

    this._cardService.put(this.card).then(res => {
      this._ws.updateCard(this.card.boardId, this.card);
    });
    this.editingCard = false;
  }

  //TODO: check lifecycle
  private ngOnDestroy() {
    //this._ws.onCardUpdate.unsubscribe();
  }

}