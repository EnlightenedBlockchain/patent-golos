import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

import { Storage } from '@ionic/storage';

import { TabsPage } from '../tabs-page/tabs-page';
import { UserData } from '../../providers/user-data';
import { GolosApiProvider } from '../../providers/golos-api/golos-api';

@IonicPage()
@Component({
  selector: 'page-logining',
  templateUrl: 'logining.html',
})
export class LoginingPage {
  email: string = '';
  password: string = '';
  loader: any;
  toast: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpClient,
    public toastCtrl: ToastController,
    public loadCtrl: LoadingController, 
    public usrData: UserData,
    public storage: Storage,
    public golos: GolosApiProvider) {
  	this.loader =  this.loadCtrl.create({
      content: 'Loggining now...',
    });
  }

  doLogin() {


	  //this.navCtrl.setRoot(TabsPage);
    //this.usrData.isLoggedIn = true; 
  	let msg;
  	this.loader.present();

    //let wif = golos.auth.toWif(this.email, this.password, 'active');
    console.log('aaaa');
    this.golos.login(this.email, this.password).then( (data: any) => {

      if (!data.flag) {
        msg = 'Error when logining...';
      }

      if(data.flag) {
        msg = 'Success login!';
        this.usrData.login(this.email, data.wif);
        this.navCtrl.setRoot(TabsPage);
      }
      this.toast = this.toastCtrl.create({
        message: msg,
          duration: 3000,
          position: 'bottom'
      });
      this.loader.dismiss();
      this.toast.present();
    });

  	/* CALL golos-provider.login ====== { email: this.email, password: this.password }).subscribe( (data: any) => {
  		
  	});*/
  }

  doFake() {

    this.navCtrl.setRoot(TabsPage);
    this.usrData.isLoggedIn = true; 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginingPage');
  }

}
