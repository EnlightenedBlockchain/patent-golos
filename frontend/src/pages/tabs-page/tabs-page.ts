import { Component } from '@angular/core';

import { NavParams, NavController } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { MapPage } from '../map/map';
import { TransactionPage } from '../transaction/transaction';
import {Map1Page} from "../map1/map";
@Component({
  templateUrl: 'tabs-page.html'
})
export class TabsPage {
  // set the root pages for each tab
  tab1Root: any = Map1Page;
  tab2Root: any = TransactionPage; 
  tab3Root: any = MapPage;
  tab4Root: any = AboutPage;
  mySelectedIndex: number;

  constructor(public navParams: NavParams, public navCtrl: NavController) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }

}
