import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { LoginingPage } from '../logining/logining';
import { GolosApiProvider } from '../../providers/golos-api/golos-api';
import { UserData } from '../../providers/user-data';
 
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  myMap: any;

  constructor(public navCtrl: NavController,
  	public navParams: NavParams,
  	public golos: GolosApiProvider,
  	public userData: UserData) {

  }

  test() {
  	//var wif = golos.auth.toWif("dyadyaJora", "1", "active");
  	//console.log('WIF', wif);
  	//this.navCtrl.push(LoginingPage);
  	this.golos.becomeSeller(this.userData.username, '0.0,0.0', 1000);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

}
