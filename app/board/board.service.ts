import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {HttpClient} from '../httpclient';
import {Board} from '../board/board';
import {Column} from '../column/column';
import {Card} from '../card/card';

@Injectable()
export class BoardService {
  apiUrl = '/board';
  
  constructor(private _http: HttpClient) {
  }

  getAll() {
    return this._http.get(this.apiUrl)
      .map((res: Response) => <Board[]>res.json().data);
  }

  get(id: string) {
    return this._http.get(this.apiUrl + '/' + id)
      .map((res: Response) => <Board>res.json().data);
  }

  getColumns(id: string) {
    return this._http.get(this.apiUrl + '/' + id + '/columns')
      .map((res: Response) => <Column[]>res.json().data);
  }

  getCards(id: string) {
    return this._http.get(this.apiUrl + '/' + id + '/cards')
      .map((res: Response) => <Card[]>res.json().data);
  }

  put(board: Board) {
    let body = JSON.stringify(board);
    console.log(body);
    this._http.put(this.apiUrl + '/' + board._id, body)
      .toPromise()
      .then(res => console.log(res.json()));
  }

  post(board: Board) {
    let body = JSON.stringify(board);
    
    return this._http.post(this.apiUrl, body)
      .map((res: Response) => <Board>res.json().data);
  }

  delete(board: Board) {
    this._http.delete(this.apiUrl + '/' + board._id)
      .toPromise()
      .then(res => console.log(res.json()));
  }

}
