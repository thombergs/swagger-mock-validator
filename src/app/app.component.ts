import { Component } from '@angular/core';
import { DataService } from './data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  data: any;
  get: any;
  myObj: JSON;

  constructor(private _dataService: DataService) {


    this._dataService.sendMockURL(myObj);

    this._dataService.getMockURL()
      .subscribe(res => {
        this.get = res;
      });

  }

  validate() {
    this._dataService.getValidationResult()
      .subscribe(res => {
        this.data = res;
        console.log(res);
      });
  }
}
