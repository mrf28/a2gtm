import {Component} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import {BoardService} from './board/board.service';
import {CardService} from './card/card.service';
import {ColumnService} from './column/column.service';
import {BoardComponent} from './board/board.component';
import {HttpClient} from './httpclient';
import {WebSocketService} from './ws.service';


@Component({
  selector: 'gtm-app',
  templateUrl: 'app/app.component.html',
  styleUrls: ['app/app.component.css'],
  directives: [BoardComponent],
  providers: [HTTP_PROVIDERS, HttpClient, WebSocketService, BoardService, ColumnService, CardService]
})
export class AppComponent {

}
