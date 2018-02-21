import { Component, ViewChild } from '@angular/core';

import { Events, MenuController, Nav, Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Storage } from '@ionic/storage';

import { AboutPage } from '../pages/about/about';
import { AccountPage } from '../pages/account/account';
import { MapPage } from '../pages/map/map';
import { SignupPage } from '../pages/signup/signup';
import { TabsPage } from '../pages/tabs-page/tabs-page';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { SupportPage } from '../pages/support/support';
import { LoginScreenPage } from '../pages/login-screen/login-screen';
//import { HomePage } from '../pages/home/home';
 
import { UserData } from '../providers/user-data';
import { GolosApiProvider } from '../providers/golos-api/golos-api';

export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabName?: string;
  tabComponent?: any;
}

@Component({
  templateUrl: 'app.template.html'
})
export class ConferenceApp {
  @ViewChild(Nav) nav: Nav;

  appPages: PageInterface[] = [
    { title: 'Map', name: 'TabsPage', component: TabsPage, tabComponent: MapPage, index: 2, icon: 'map' },
    { title: 'About', name: 'TabsPage', component: TabsPage, tabComponent: AboutPage, index: 3, icon: 'information-circle' }
  ];
  loggedInPages: PageInterface[] = [
    { title: 'Account', name: 'AccountPage', component: AccountPage, icon: 'person' },
    { title: 'Support', name: 'SupportPage', component: SupportPage, icon: 'help' },
    { title: 'Logout', name: 'TabsPage', component: TabsPage, icon: 'log-out', logsOut: true }
  ];
  loggedOutPages: PageInterface[] = [
    { title: 'Support', name: 'SupportPage', component: SupportPage, icon: 'help' },
    { title: 'Signup', name: 'SignupPage', component: SignupPage, icon: 'person-add' }
  ];
  rootPage: any;
  _username: string;
  _wif: string;

  constructor(
    public events: Events,
    public userData: UserData,
    public menu: MenuController,
    public platform: Platform,
    public storage: Storage,
    public splashScreen: SplashScreen,
    public golos: GolosApiProvider
  ) {
    this.rootPage = LoginScreenPage;

    this.storage.get('hasSeenTutorial')
      .then((hasSeenTutorial) => {
        console.log(hasSeenTutorial);
        /*if (!hasSeenTutorial) {
          this.rootPage = TutorialPage;
        } else {*/
          this.checkIsLoggedIn().then( logged => {
            if (logged) {
              this.rootPage = TabsPage;
              this.userData.login(this._username, this._wif);
              this.userData.isLoggedIn = true;
            }

            this.platformReady();
          });

          return;
        /*}
        this.platformReady()*/
      });

    this.listenToLoginEvents();
  }

  openPage(page: PageInterface) {
    let params = {};

    if (page.index) {
      params = { tabIndex: page.index };
    }

    if (this.nav.getActiveChildNavs().length && page.index != undefined) {
      this.nav.getActiveChildNavs()[0].select(page.index);
    } else {
      this.nav.setRoot(page.name, params).catch((err: any) => {
        console.log(`Didn't set nav root: ${err}`);
      });
    }

    if (page.logsOut === true) {
      this.userData.logout();
    }
  }

  openTutorial() { 
    this.nav.setRoot(TutorialPage);
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {

    });

    this.events.subscribe('user:signup', () => {

    });

    this.events.subscribe('user:logout', () => {

    });
  }

  platformReady() {
    this.platform.ready().then(() => {
      this.splashScreen.hide();
    });
  }

  isActive(page: PageInterface) {
    let childNav = this.nav.getActiveChildNavs()[0];

    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary';
      }
      return;
    }

    if (this.nav.getActive() && this.nav.getActive().name === page.name) {
      return 'primary';
    }
    return;
  }

  checkIsLoggedIn(): Promise<any> {
    let _err = false;
    return this.storage.get('username').then( username => {
      this._username = username;

      if (!username) _err = true;

      return this.storage.get('wif');
    }).then( wif => {
      this._wif = wif;

      if (!wif) _err = true;

      return this.golos.verifySavedLogin(this._username, this._wif);
      // TODO golos-provider.verify
      //          this.isLoggedIn = true;
      //          else -> this.storage.set('username', ''); this.storage.set('wif', ''); 
    });
  }
}
