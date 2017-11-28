import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  result: any;
  get: any;

  constructor(private _http: Http) { }

  getValidationResult() {
    return this._http.get('/results')
      .map(result => this.result = result['_body']);
  }

  sendMockURL(urlObj: any) {
    this._http.post('/urls', urlObj)
      .subscribe(data => {
        console.log(data);
      });
  }
}
