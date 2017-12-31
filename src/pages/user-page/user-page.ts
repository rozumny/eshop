import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular/navigation/nav-params';

@Component({
  selector: 'user-page',
  templateUrl: 'user-page.html'
})
export class UserPage {
  private data: any = {};

  constructor(
    public navParams: NavParams
  ) {
    this.data = navParams.data;
  }
}
