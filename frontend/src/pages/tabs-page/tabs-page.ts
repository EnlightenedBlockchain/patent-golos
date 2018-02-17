import { Component } from '@angular/core';

import { NavParams, NavController } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { MapPage } from '../map/map';
import { SchedulePage } from '../schedule/schedule';
import { SpeakerListPage } from '../speaker-list/speaker-list';
//import { LoginScreenPage } from '../login-screen/login-screen';

@Component({
  templateUrl: 'tabs-page.html'
})
export class TabsPage {
  // set the root pages for each tab
  tab1Root: any = SchedulePage;
  tab2Root: any = SpeakerListPage;
  tab3Root: any = MapPage;
  tab4Root: any = AboutPage;
  mySelectedIndex: number;

  constructor(public navParams: NavParams, public navCtrl: NavController) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;

    //this.navCtrl.setRoot(LoginScreenPage);
  }

}
