// DEPENDENCIES
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
// PROVIDERS
import { BoardService } from './board/board.service';
import { CardService } from './card/card.service';
import { ColumnService } from './column/column.service';
import { HttpClient } from './httpclient';
import { WebSocketService } from './ws.service';

// COMPONENTS
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component'
import { BoardComponent } from './board/board.component';
import { ColumnComponent } from './column/column.component';
import { CardComponent } from './card/card.component';
import { CardDetailComponent } from './card-detail/card-detail.component';

// PIPES
import { OrderBy } from './pipes/orderby.pipe';
import { Where } from './pipes/where.pipe';

const appRoutes: Routes = [
  {
     path: 'b/:id', component: BoardComponent,
     children: [ 
        {
          path: ':id', component: CardDetailComponent,
        }
     ]
  },
  { path: '', component: DashboardComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    BoardComponent,
    ColumnComponent,
    CardComponent,
    CardDetailComponent,
    OrderBy,
    Where,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [HttpClient, WebSocketService, BoardService, ColumnService, CardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
