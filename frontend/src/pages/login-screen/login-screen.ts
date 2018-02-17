import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//import { TabsPage } from '../tabs-page/tabs-page';
import { LoginingPage } from '../logining/logining';
import { SignupPage } from '../signup/signup';

declare var golos: any;

@Component({
  selector: 'page-login-screen',
  templateUrl: 'login-screen.html',
})
export class LoginScreenPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	//this.navCtrl.setRoot(TabsPage);
        let username2 = 'dyadyaJora';
    let password2 = 'fdhgfghf';
    golos.api.login(username2, password2, function(err, result, data) {
    //console.log(err, result);
    if (!err) {
        console.log('login', result);
    }
    else console.error(err);
    });
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
