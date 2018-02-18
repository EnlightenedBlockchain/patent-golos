import { Component, ViewChild, ElementRef } from '@angular/core';
import { AlertController } from 'ionic-angular';

import { Platform } from 'ionic-angular';
import { UserData } from '../../providers/user-data';

declare var google: any;


@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  curLoc: any;
  radius: number = 10000;

  @ViewChild('mapCanvas') mapElement: ElementRef;
  constructor(public platform: Platform, public userData: UserData, private alertCtrl: AlertController) {
    this.curLoc = {lat: 45.0, lng: 34.000};
  }

  ionViewDidLoad() {

      let mapEle = this.mapElement.nativeElement;
      let _this = this;

        let map = new google.maps.Map(mapEle, {
          center: this.curLoc,
          zoom: 10
        });

        let marker = new google.maps.Marker({
          position: this.curLoc,
          map: map,
          title: 'Hello World!',
          draggable: true
        });

        var circle = new google.maps.Circle({
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#FF0000',
          fillOpacity: 0.35,
          map: map,
          center: this.curLoc,
          radius: this.radius
        });

        google.maps.event.addListener(marker, 'drag', function(e) 
        {
           _this.curLoc.lat = e.latLng.lat();
           _this.curLoc.lng = e.latLng.lng();
           circle.setCenter(_this.curLoc);
        });

        google.maps.event.addListener(marker, 'dragend', function() 
        {
          if (_this.userData.isSeller)
            _this.showConfirm();
        });
        /*mapData.forEach((markerData: any) => {
          let infoWindow = new google.maps.InfoWindow({
            content: `<h5>${markerData.name}</h5>`
          });

          let marker = new google.maps.Marker({
            position: markerData,
            map: map,
            title: markerData.name
          });

          marker.addListener('click', () => {
            infoWindow.open(map, marker);
          });
        });*/

        google.maps.event.addListenerOnce(map, 'idle', () => {
          mapEle.classList.add('show-map');
        });
  }

  showConfirm() {
    if (!this.userData.isSeller)
      return;

    let alert = this.alertCtrl.create({
      title: 'Подтверждение',
      message: 'Вы уверены, что хотите стать продавцом в области с центром ' + this.curLoc.lat +',' + this.curLoc.lng + '. с радиусом - ' + this.radius +'?',
      buttons: [
        {
          text: 'Да',
          handler: () => {
            // TODO шлем данные  в голос
            this.userData.isSeller = true;
          }
        },
        {
          text: 'Нет',
          handler: () => {
            this.userData.isSeller = false;
          }
        }
      ]
    });
    alert.present();
  }
}