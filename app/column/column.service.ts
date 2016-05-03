import {Injectable} from 'angular2/core';
import {Http, Headers, RequestOptionsArgs} from 'angular2/http';
import {HttpClient} from '../httpclient'
import {Column} from '../column/column';
import {Card} from '../card/card';


@Injectable()
export class ColumnService {
  apiUrl = '/column';

  constructor(private _http: HttpClient) {
  }

  getAll() {
    return this._http.get(this.apiUrl)
      .map(res => <Column[]>res.json().data);
  }

  get(id: string) {
    return this._http.get(this.apiUrl + '/' + id)
      .map(res => <Column>res.json().data);
  }

  getCards(id: string) {
    return this._http.get(this.apiUrl + '/' + id + '/cards')
      .map(res => <Card[]>res.json().data);
  }

  put(column: Column) {
    return this._http
      .put(this.apiUrl + '/' + column._id, JSON.stringify(column))
      .toPromise();
  }

  post(column: Column) {;
    return this._http.post(this.apiUrl, JSON.stringify(column))
      .map(res => <Column>res.json().data);
  }

  delete(column: Column) {
    return this._http.delete(this.apiUrl + '/' + column._id)
      .toPromise();

  }

}
