import { Component, ViewChild, ElementRef } from '@angular/core';

import { Platform } from 'ionic-angular';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  @ViewChild('mapCanvas') mapElement: ElementRef;
  constructor(public platform: Platform) {
  }

  ionViewDidLoad() {
  }
}
