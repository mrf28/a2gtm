import {Injectable} from 'angular2/core';
import {Http, Response, Headers, RequestOptionsArgs } from 'angular2/http';

@Injectable()
export class HttpClient {
  headers: Headers;
  options: RequestOptionsArgs;
  
  constructor(private _http: Http) {
    this.headers = new Headers();

    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
    this.options = { headers: this.headers }
  }

  public get(url: string, options?: RequestOptionsArgs) {
    return this._http.get(url, options || this.options);
  }

  public post(url: string, body: string, options?: RequestOptionsArgs){
    return this._http.post(url, body, options || this.options);
  }

  public put(url: string, body: string, options?: RequestOptionsArgs) {
    console.log(options || this.options);
    return this._http.put(url, body, options || this.options);
  }

  public delete(url: string, options?: RequestOptionsArgs) {
    return this._http.delete(url, options || this.options);
  }
}