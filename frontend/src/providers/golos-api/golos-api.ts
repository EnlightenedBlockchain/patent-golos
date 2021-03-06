import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

import * as golos from 'golos-js';

@Injectable()
export class GolosApiProvider {

  constructor(public http: HttpClient, public storage: Storage) {
    console.log('Hello GolosApiProvider Provider');
  }

  verifySavedLogin(login:string, wif:string): Promise<any> {
  	let _this = this;

  	return new Promise( resolve => {
	  	golos.api.getAccounts([login], function(err, response) {
	  		if (! err) {
				let privWif:string = wif; 
				let resultWifToPublic:string = golos.auth.wifToPublic(privWif);
				if (!response.length) {
					resolve(false);
					return;
				}

				if (response[0].active.key_auths[0][0] == resultWifToPublic) {
					_this.storage.set('wif_post', response[0].posting.key_auths[0][0]);
					console.log('yes, is it private posting key!');
					resolve(true);
					return;
				}
				else {
					console.log('no, is it not private posting key!');
					resolve(false);
					return;
				}
			}
		});
	 });
  }

  login(email:string, pswd: string): Promise<any> {
	let wif = golos.auth.toWif(email, pswd, 'active');


	let keys = golos.auth.getPrivateKeys(email, pswd);

	this.storage.set('keys', keys);

	return new Promise( resolve => {
	  	this.verifySavedLogin(email, wif).then( data => {
	  		resolve({ flag: data, wif: wif });
	  	});
	});
  }

  becomeSeller(username: string, latLng: string, radius: number) {
  	let meta = {
  		location: latLng,
  		radius: radius,
  		type: 'seller_activated',
  		active: true,
  		telegram: 'pahatrop',
  		date: new Date().toISOString()
  	};

  	this.storage.get('keys'). then( keys => {
  		let postWif = keys.posting;
  		let permalink = 'want-be-seller-'+ new Date().getTime();

  		golos.broadcast.comment(postWif, '', 'hackatonsimferopol', username, permalink, 'TITLE', 'Получен статус SELLER на нашем ресурсе.', JSON.stringify(meta), function(err, res) {
	  		console.log(err, res);
	  	});

	  	/* golos.broadcast.comment(postWif, 'dyadyajora', 'hackaton', username, 'test-urlsjfgsjgfjsgfjf', 'TITLE', 'Получен статус SELLER на нашем ресурсе.', JSON.stringify(meta), function(err, res) {
	  		console.log(err, res);
	  	});*/
  	});
  	
  }

}
