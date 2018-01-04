import {Component, OnInit, Input, Output, EventEmitter, ElementRef, NgZone} from '@angular/core';
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
  card:Card = new Card();
  editingCard = false;
  editingDescription = false;
  currentTitle: string;
  currentDescription: string;
  
  constructor(private el: ElementRef,
    private route: ActivatedRoute,
    private router: Router,
    private _ws: WebSocketService,
    private _cardService: CardService) {
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

  blurOnEnterTitle(event: KeyboardEvent) {
    if (event.key === "Enter") {
      (<HTMLElement>event.target).blur();
    } else if (event.keyCode === 27) {
      this.card.title = this.currentTitle;
      this.editingCard = false;
    }
  }
  
  editTitle() {
    this.editingCard = true;
    this.currentTitle = this.card.title;

    let input = this.el.nativeElement.getElementsByTagName('input')[0];

    setTimeout(function() {
      input.focus();
    }, 0);
  }

  updateTitle() {
    if (!this.card.title || this.card.title.trim() === '') {
      this.card.title = this.currentTitle;
    }

    this._cardService.put(this.card).then(res => {
      this._ws.updateCard(this.card.boardId, this.card);
    });
    this.editingCard = false;
  }

  
  blurOnEnterDescription(event) {
    if (event.keyCode === 13) {
      event.target.blur();
    } else if (event.keyCode === 27) {
      this.card.description = this.currentDescription;
      this.editingDescription = false;
    }
  }
  
  adjustHeight(event: Event){
    let el = <HTMLElement>event.target;
    this.adjustTextAreaHeight(el);
  }

  adjustTextAreaHeight(el: HTMLElement){
    el.style.height = '0';
    let minheight = parseFloat(window.getComputedStyle(el, null).minHeight);
    let height = el.scrollHeight + 4;
    if (height >= minheight){
      if (el.style.height != (height + 'px'))
        el.style.height = height + 'px';
    } else {
        el.style.height = minheight +'px';
    }
  }

  editDescription() {
    this.editingDescription = true;
    this.currentDescription = this.card.description;
    let textArea = this.el.nativeElement.querySelector('#descriptionEditor');

    var that = this;
    setTimeout(function() {
      textArea.focus();
      that.adjustTextAreaHeight(textArea);
    }, 0);
  }

  updateDescription() {
    this.card.description = this.card.description.trim();
    
    this._cardService.put(this.card).then(res => {
      this._ws.updateCard(this.card.boardId, this.card);
    });
    this.editingDescription = false;
  }

  cancelEditDescription() {
    this.card.description = this.currentDescription;
    this.editingDescription = false;
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