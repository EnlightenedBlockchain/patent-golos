import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, ErrorHandler } from '@angular/core';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IonicStorageModule } from '@ionic/storage';

import { ConferenceApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { PopoverPage } from '../pages/about-popover/about-popover';
import { AccountPage } from '../pages/account/account';
import { MapPage } from '../pages/map/map';
import { SignupPage } from '../pages/signup/signup';
import { TabsPage } from '../pages/tabs-page/tabs-page';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { SupportPage } from '../pages/support/support';
import { LoginScreenPage } from '../pages/login-screen/login-screen';
import { LoginingPage } from '../pages/logining/logining';
import { HomePage } from '../pages/home/home';
import { TransactionPage } from '../pages/transaction/transaction';
import { TransHistoryPage } from '../pages/trans-history/trans-history';

import { UserData } from '../providers/user-data';


@NgModule({
  declarations: [
    ConferenceApp,
    AboutPage,
    AccountPage,
    MapPage,
    PopoverPage,
    SignupPage,
    TabsPage,
    TutorialPage,
    SupportPage,
    LoginScreenPage,
    LoginingPage,
    HomePage,
    TransactionPage,
    TransHistoryPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(ConferenceApp, {}, {
      links: [
        { component: TabsPage, name: 'TabsPage', segment: 'tabs-page' },
        { component: MapPage, name: 'Map', segment: 'map' },
        { component: AboutPage, name: 'About', segment: 'about' },
        { component: TutorialPage, name: 'Tutorial', segment: 'tutorial' },
        { component: SupportPage, name: 'SupportPage', segment: 'support' },
        { component: AccountPage, name: 'AccountPage', segment: 'account' },
        { component: TransHistoryPage, name: 'TransHistoryPage', segment: 'trans-history' },
        //{ component: SignupPage, name: 'SignupPage', segment: 'signup' }
      ]
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ConferenceApp,
    AboutPage,
    AccountPage,
    MapPage,
    PopoverPage,
    SignupPage,
    TabsPage,
    TutorialPage,
    SupportPage,
    LoginScreenPage,
    LoginingPage,
    HomePage,
    TransactionPage,
    TransHistoryPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    UserData,
    InAppBrowser,
    SplashScreen
  ]
})
export class AppModule { }
