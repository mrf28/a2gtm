import {Directive, ElementRef, OnInit} from 'angular2/core';

@Directive({
})
export class HitEnterDirective implements OnInit {
  
  constructor(public el: ElementRef) {
    
  }

  ngOnInit(){
    this.el.nativeElement.onKeyDown = this.hookEnter;
  }

  hookEnter(e){
    
  }
}