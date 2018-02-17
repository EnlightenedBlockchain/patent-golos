import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginingPage } from '../logining/logining';

//import * as $ from 'jquery';
import * as golos from 'golos-js';

//declare var golos: any;
declare var ymaps: any;
 
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  myMap: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	//ymaps.ready(init);
  	var _this = this;
  	console.log('=======', golos);
    function init(){ 
	  	var element, dragger, draggerEventsGroup; 
	  	var CustomControlClass = function (options) {
	  		// @ts-ignore
            CustomControlClass.superclass.constructor.call(this, options);
            this._$content = null;
            this._geocoderDeferred = null; 
        };

        _this.myMap = new ymaps.Map('my-map', {
            center: [_this.navParams.data.lat, _this.navParams.data.lon],
            zoom: 9
        });
        element = document.getElementById('marker'),
	    dragger = new ymaps.util.Dragger({
	        autoStartElement: element
	    }),
	    draggerEventsGroup = dragger.events.group();
        
	    ymaps.util.augment(CustomControlClass, ymaps.collection.Item, {
	        onAddToMap: function (map) {
	        	// @ts-ignore
	            CustomControlClass.superclass.onAddToMap.call(this, map);
	            this._lastCenter = null;
	            this.getParent().getChildElement(this).then(this._onGetChildElement, this);
	        },

	        onRemoveFromMap: function (oldMap) {
	            this._lastCenter = null;
	            if (this._$content) {
	                this._$content.remove();
	                this._mapEventGroup.removeAll();
	            }
	            // @ts-ignore
	            CustomControlClass.superclass.onRemoveFromMap.call(this, oldMap);
	        }, 

	        _onGetChildElement: function (parentDomContainer) {
	            this._$content = $('<div class="customControl"><span class="customControl__address"></span> <span class="customControl__loc"></span></div>').appendTo(parentDomContainer);
	            this._mapEventGroup = this.getMap().events.group();

	            this._mapEventGroup.add('boundschange', this._createRequest, this);

	            //this._createRequest();
	        }
	    });

	    var customControl = new CustomControlClass({});
	    _this.myMap.controls.add(customControl, {
	        float: 'none',
	        position: {
	            bottom: 40,
	        }
	    });
    }
  }

  test() {
  	//var wif = golos.auth.toWif("dyadyaJora", "1", "active");
  	//console.log('WIF', wif);
  	this.navCtrl.push(LoginingPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

}
