import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActiveTransactionsPage } from './active-transactions';

@NgModule({
  declarations: [
    ActiveTransactionsPage,
  ],
  imports: [
    IonicPageModule.forChild(ActiveTransactionsPage),
  ],
})
export class ActiveTransactionsPageModule {}
