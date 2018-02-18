import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public loader: LoadingController) {
  }

  makeRequest() {
  	let _from = this.from;
  	let _this = this;
  	let l = this.loader.create({
  		content: 'Making request'
  	});
  	let wif = golos.auth.toWif(this.from, this.password, "active");
  	console.log(wif);
  	let alert;
  	l.present();
  	golos.broadcast.transfer(wif, this.from, this.to, this.amount + ' GOLOS', this.memo, function(err, result) {
	  console.log(err, result, '_+_+_+_+_+_+_+_');
	  l.dismiss();
	  if (!err) {
	    console.log('transfer', result); 
	    golos.api.getAccounts([_from], function(err, res) {
	    	if(!err) {
	    		alert = _this.alertCtrl.create({
				    title: 'Успешно завершена транзакция!',
				    subTitle: 'На балансе остаток: ' + res[0].balance,
				    buttons: ['Ок']
				});

	    		alert.present();
	    	}
	    });
	  }
	  else  {
	  	console.error(err);
	  	alert = _this.alertCtrl.create({
		    title: 'Ошибка!',
		    subTitle: 'Ошибка при выполнении транзакции',
		    buttons: ['Ок']
		  });
	  	alert.present();
	  }
	});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransactionPage');
  }

}
