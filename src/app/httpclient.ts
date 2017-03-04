import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptionsArgs } from '@angular/http';
import { ROOT_URL } from './constants'

@Injectable()
export class HttpClient {
  headers: Headers;
  options: RequestOptionsArgs;
  rootUrl: String = ROOT_URL;

  constructor(private _http: Http) {
    this.headers = new Headers();

    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
    this.options = { headers: this.headers }
  }

  public get(url: string, options?: RequestOptionsArgs) {
    url = this.handleUrl(url);
    return this._http.get(url, options || this.options);
  }

  public post(url: string, body: string, options?: RequestOptionsArgs) {
    url = this.handleUrl(url);
    return this._http.post(url, body, options || this.options);
  }

  public put(url: string, body: string, options?: RequestOptionsArgs) {
    url = this.handleUrl(url);
    return this._http.put(url, body, options || this.options);
  }

  public delete(url: string, options?: RequestOptionsArgs) {
    url = this.handleUrl(url);
    return this._http.delete(url, options || this.options);
  }

  private handleUrl(url: string): string {
    if (!this.checkUrlExternal(url)) {
      if (url.charAt(0) == '/') url = url.substring(1);
      url = this.rootUrl + url;
    }
    return url;
  }

  private checkUrlExternal(url: string): boolean {
    return /^(?:[a-z]+:)?\/\//i.test(url);
  }

}