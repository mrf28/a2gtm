import {Component} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
import {BoardService} from './board/board.service';
import {CardService} from './card/card.service';
import {ColumnService} from './column/column.service';
import {BoardComponent} from './board/board.component';
import {HttpClient} from './httpclient';
import {WebSocketService} from './ws.service';
import {DashboardComponent} from './dashboard/dashboard.component'


@Component({
  selector: 'gtm-app',
  templateUrl: 'app/app.component.html',
  styleUrls: ['app/app.component.css'],
  directives: [ROUTER_DIRECTIVES, BoardComponent],
  providers: [HTTP_PROVIDERS, ROUTER_PROVIDERS, HttpClient, WebSocketService, BoardService, ColumnService, CardService]
})
@RouteConfig([
  { path: '/', name: 'Dashboard', component: DashboardComponent, useAsDefault: true },
  { path: '/b/:id', name: 'Board', component: BoardComponent },
])
export class AppComponent {

}
