import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import * as golos from 'golos-js';

@IonicPage()
@Component({
  selector: 'page-transaction',
  templateUrl: 'transaction.html',
})
export class TransactionPage {
  from: string;
  password:  string;
  to:  string;
  amount:  string;
  memo:  string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  makeRequest() {
  	let wif = golos.auth.toWif(this.from, this.password, "active");

  	golos.broadcast.transfer(wif, this.from, this.to, this.amount, this.memo, function(err, result) {
	  console.log(err, result, '_+_+_+_+_+_+_+_');
	  if (!err) {
	    console.log('transfer', result); 
	  }
	  else console.error(err);
	});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransactionPage');
  }

}
