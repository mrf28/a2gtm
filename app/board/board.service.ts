import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {HttpClient} from '../httpclient';
import {Board} from '../board/board';
import {Column} from '../column/column';
import {Card} from '../card/card';

const baseUrl = 'http://localhost:3001';
const apiUrl = baseUrl + '/board';

@Injectable()
export class BoardService {

  constructor(private _http: HttpClient) {

  }

  getAll() {
    return this._http.get(apiUrl)
      .map((res: Response) => <Board[]>res.json().data);
  }

  get(id: string) {
    return this._http.get(apiUrl + '/' + id)
      .map((res: Response) => <Board>res.json().data);
  }

  getColumns(id: string) {
    return this._http.get(apiUrl + '/' + id + '/columns')
      .map((res: Response) => <Column[]>res.json().data);
  }

  getCards(id: string) {
    return this._http.get(apiUrl + '/' + id + '/cards')
      .map((res: Response) => <Card[]>res.json().data);
  }

  put(board: Board) {
    let body = JSON.stringify(board);
    console.log(body);
    this._http.put(apiUrl + '/' + board._id, body)
      .toPromise()
      .then(res => console.log(res.json()));
  }

  post(board: Board) {
    let body = JSON.stringify(board);
    
    return this._http.post(apiUrl, body)
      .map((res: Response) => <Board>res.json().data);
  }

  delete(board: Board) {
    this._http.delete(apiUrl + '/' + board._id)
      .toPromise()
      .then(res => console.log(res.json()));
  }

}
