import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//import { TabsPage } from '../tabs-page/tabs-page';
import { LoginingPage } from '../logining/logining';
import { SignupPage } from '../signup/signup';

@Component({
  selector: 'page-login-screen',
  templateUrl: 'login-screen.html',
})
export class LoginScreenPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	//this.navCtrl.setRoot(TabsPage);
  }

  loggining() {
  	this.navCtrl.push(LoginingPage);
  }

  signup() {
  	this.navCtrl.push(SignupPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginScreenPage');
  }

}
