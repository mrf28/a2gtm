import {Component, OnInit, Input, Output, EventEmitter, ElementRef, ChangeDetectorRef, NgZone} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Card} from '../card/card';
import {Column} from '../column/column';
import {CardService} from '../card/card.service';
import {WebSocketService} from '../ws.service';

@Component({
  selector: 'gtm-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.css'],
})
export class CardDetailComponent implements OnInit {
  card: Card;
  editingCard = false;
  currentTitle: string;
  constructor(private el: ElementRef,
    private route: ActivatedRoute,
    private router: Router,
    private _ref: ChangeDetectorRef,
    private _ws: WebSocketService,
    private _cardService: CardService) {
    this.card = new Card();
  }

  ngOnInit() {
    let id = this.route.snapshot.params["id"];
    this._cardService.get(id).subscribe((card: Card) =>{
        this.card = card;
    });

    this._ws.onCardUpdate.subscribe((card: Card) => {
      if (this.card._id === card._id) {
        this.card = card;
      }
    });
  }

  blurOnEnterTitle(event) {
    if (event.keyCode === 13) {
      event.target.blur();
    } else if (event.keyCode === 27) {
      this.card.title = this.currentTitle;
      this.editingCard = false;
    }
  }
  
  editTitle(e) {
    e.stopPropagation();
    this.editingCard = true;
    this.currentTitle = this.card.title;

    let textArea = this.el.nativeElement.getElementsByTagName('textarea')[0];

    setTimeout(function() {
      textArea.focus();
    }, 0);
  }

  updateTitle(e) {
    if (!this.card.title || this.card.title.trim() === '') {
      this.card.title = this.currentTitle;
    }

    this._cardService.put(this.card).then(res => {
      this._ws.updateCard(this.card.boardId, this.card);
    });
    this.editingCard = false;
  }

  close(e){    
    e.stopPropagation();
    this.router.navigate(['../'], { relativeTo: this.route });
      //this.router.navigate("");
  }

  stopPropagation(e){
    e.stopPropagation();
  }

}