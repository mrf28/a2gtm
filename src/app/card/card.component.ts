import {Component, OnInit, Input, Output, EventEmitter, ElementRef, NgZone} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Card} from './card';
import {Column} from '../column/column';
import {CardService} from './card.service';
import {WebSocketService} from '../ws.service';

@Component({
  selector: 'gtm-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input()
  card: Card;
  @Output() cardUpdate: EventEmitter<Card>;
  editingCard = false;
  currentTitle: string;
  zone: NgZone;
  constructor(private el: ElementRef,
    private route: ActivatedRoute,
    private router: Router,
    private _ws: WebSocketService,
    private _cardService: CardService) {
    this.zone = new NgZone({ enableLongStackTrace: false });
    this.cardUpdate = new EventEmitter();
  }

  ngOnInit() {
    this._ws.onCardUpdate.subscribe((card: Card) => {
      if (this.card._id === card._id) {
        this.card.title = card.title;
        this.card.order = card.order;
        this.card.columnId = card.columnId;
      }
    });
  }

  blurOnEnter(event) {
    if (event.keyCode === 13) {
      event.target.blur();
    } else if (event.keyCode === 27) {
      this.card.title = this.currentTitle;
      this.editingCard = false;
    }
  }

  editCard(e) {
    e.stopPropagation();
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

  showDetail(){
      if (!this.editingCard){
        this.router.navigate([this.card._id], { relativeTo: this.route });
      }
  }
}