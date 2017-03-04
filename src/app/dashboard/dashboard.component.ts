import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BoardService} from '../board/board.service';
import {Board} from '../board/board'

@Component({
  selector: 'gtm-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
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
    setTimeout(function() {
      document.getElementById('content-wrapper').style.backgroundColor = "#fff";
    }, 100);
  }

  public addBoard(){
    console.log('Adding new board');
    this._bs.post(<Board>{ title: "New board" })
      .subscribe((board: Board) => {
        this._router.navigate(['/b', board._id]);
        console.log('new board added');
    });
  }

}