import {Component, OnInit} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {BoardService} from '../board/board.service';
import {Board} from '../board/board'

@Component({
  selector: 'gtm-dashboard',
  templateUrl: 'app/dashboard/dashboard.component.html',
  styleUrls: ['app/dashboard/dashboard.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class DashboardComponent implements OnInit {
  boards: Board[];

  constructor(private _bs: BoardService,
      private _router: Router) { }

  ngOnInit() {
    this.boards = [];
    this._bs.getAll().subscribe((boards:Board[]) => {
      this.boards = boards;
    });
  }

  public addBoard(){
    this._bs.post(<Board>{ title: "New board" })
      .subscribe((board: Board) => {
        this._router.navigate(['Board', { id: board._id }]);
    });
  }

}