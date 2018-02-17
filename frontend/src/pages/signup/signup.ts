import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';

import { HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  email: string = '';
  password: string = '';
  firstName: string = '';
  secondName: string = '';
  toast: any;
  loader: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public toastCtrl: ToastController, public loadCtrl: LoadingController) {
  	this.loader = this.loadCtrl.create({
  		content: 'Register...'
  	});
  }

  doRegister() {
  	let msg;

  	this.loader.present();
  	this.http.post('/api/login/sign_up', { 
  		email: this.email,
  		password: this.password,
  		firstName: this.firstName,
  		secondName: this.secondName
  	}).subscribe( (data: any) => {
  		if (data.err_code) {
  			msg = 'Error ' + data.er_code + '. ' + data.message;
  			return;
  		}

  		if(data.status) {
  			msg = 'Success register! Login now';
  			this.navCtrl.pop();
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
    console.log('ionViewDidLoad SignupPage');
  }

}
