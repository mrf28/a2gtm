import {Component} from 'angular2/core';
import {BoardService} from './board/board.service';
import {BoardComponent} from './board/board.component';

@Component({
    selector: 'gtm-app',
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css'],
    directives: [BoardComponent],
    providers: [BoardService]
})
export class AppComponent {
    
 }