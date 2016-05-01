import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {HttpClient} from '../httpclient';
import {Card} from '../card/card';

const baseUrl = 'http://localhost:3001';
const apiUrl = baseUrl + '/card';

@Injectable()
export class CardService {
  
  constructor(private _http: HttpClient) {

  }

  getAll() {
    return this._http.get(apiUrl)
      .map(res => res.json());
  }

  get(id: string) {
    return this._http.get(apiUrl + '/' + id)
      .map(res => res.json());
  }

  put(card: Card) {
    this._http.put(apiUrl + '/' + card._id, JSON.stringify(card))
      .toPromise()
      .then(res => console.log(res.json()));
  }

  post(card: Card) {
    return this._http.post(apiUrl, JSON.stringify(card))
      .map(res => <Card>res.json().data);
  }

  delete(card: Card) {
    this._http.delete(apiUrl + '/' + card._id)
      .toPromise()
      .then(res => console.log(res.json()));
  }

}
