import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

import { Storage } from '@ionic/storage';

import { TabsPage } from '../tabs-page/tabs-page';
import { UserData } from '../../providers/user-data';
import * as golos from 'golos-js';

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
    public storage: Storage) {
  	this.loader =  this.loadCtrl.create({
      content: 'Loggining now...',
    });
  }

  doLogin() {

	  //this.navCtrl.setRoot(TabsPage);
    //this.usrData.isLoggedIn = true;
  	let msg;
  	this.loader.present();

    let wif = golos.auth.toWif(this.email, this.password, 'active');
    console.log('aaaa');
    this.storage.set('wif', wif);
    this.storage.set('login', this.email);

  	this.http.post('/api/login/sign_up', { email: this.email, password: this.password }).subscribe( (data: any) => {
  		if (data.err_code) {
  			msg = 'Error ' + data.er_code + '. ' + data.message;
  			return;
  		}

  		if(data.status) {
  			msg = 'Success login!';
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
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginingPage');
  }

}
