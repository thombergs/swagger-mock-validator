import { Component } from '@angular/core';
import { DataService } from './data.service';
import { Input } from '@angular/core/src/metadata/directives';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  data: any;
  get: any;

  mockURL: string;
  swaggerURL: string;
  myObj: any = {
    mock: '',
    swagger: ''
  };

  constructor(private _dataService: DataService) {

  }

  validate() {

    this.myObj.mock = this.mockURL;
    this.myObj.swagger = this.swaggerURL;
    this._dataService.sendMockURL(this.myObj);

    this._dataService.getValidationResult()
      .subscribe(res => {
        this.data = res;
        console.log(res);
      });
  }
}
