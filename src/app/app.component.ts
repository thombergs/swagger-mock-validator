import { Component } from '@angular/core';
import { DataService } from './data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  data: any;

  constructor(private _dataService: DataService) { }

  validate() {
    this._dataService.getValidationResult()
      .subscribe(res => {
        this.data = res;
        console.log(res);
      });

    this._dataService.sendMockURL('wasdwa');

    this._dataService.getMockURL()
      .subscribe(res => { });
  }
}
