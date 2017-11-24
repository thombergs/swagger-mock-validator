import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  result: any;
  get: any;

  constructor(private _http: Http) {  }

  getValidationResult() {
    return this._http.get('/results')
      .map(result => this.result = result['_body']);
  }

  sendMockURL(mockURL: string) {
    return this._http.post('/mockURL', mockURL)
      .map(res => console.log(res));
  }

  getMockURL() {
    return this._http.get('/mockURL')
      .map(result => this.result = result['_body']);
  }

}
