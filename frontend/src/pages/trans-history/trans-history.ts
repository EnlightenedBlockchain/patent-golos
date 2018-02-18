import { Component } from '@angular/core';


@Component({
  selector: 'page-trans-history',
  templateUrl: 'trans-history.html'
})
export class TransHistoryPage {
  conferenceDate = '2047-05-17';

  constructor(public popoverCtrl: PopoverController) { }

  presentPopover(event: Event) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({ ev: event });
  }
}