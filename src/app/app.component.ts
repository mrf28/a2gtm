import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {  
  showDisclaimer: boolean = true;
  constructor(){
  }

  ngOnInit(){
    if (localStorage['disclaimerClosed'] === 'true'){
      this.showDisclaimer = false;
    } else {
      this.showDisclaimer = true;
    }
  }

  closeDisclaimer(){
    this.showDisclaimer = false;
    localStorage['disclaimerClosed'] = true;
  }
}

