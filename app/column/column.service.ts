import {Injectable} from 'angular2/core';
import {Http, Headers, RequestOptionsArgs} from 'angular2/http';
import {HttpClient} from '../httpclient'
import {Column} from '../column/column';
import {Card} from '../card/card';

var baseUrl = 'http://localhost:3001';
var apiUrl = baseUrl + '/column';

@Injectable()
export class ColumnService {
  //cache
  cards: Card[]

  constructor(private _http: HttpClient) {
    this.cards = [];
  }

  getAll() {
    return this._http.get(apiUrl)
      .map(res => <Column[]>res.json().data);
  }

  get(id: string) {
    return this._http.get(apiUrl + '/' + id)
      .map(res => <Column>res.json().data);
  }

  getCards(id: string) {
    return this._http.get(apiUrl + '/' + id + '/cards')
      .map(res => <Card[]>res.json().data);
  }

  put(column: Column) {
    this._http
      .put(apiUrl + '/' + column._id, JSON.stringify(column))
      .toPromise()
      .then(res => console.log(res.json()));
  }

  post(column: Column) {;
    return this._http.post(apiUrl, JSON.stringify(column))
      .map(res => <Column>res.json().data);
  }

  delete(column: Column) {
    this._http.delete(apiUrl + '/' + column._id)
      .toPromise()
      .then(res => console.log(res.json()));

  }

}
