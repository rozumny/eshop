import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// import pages
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
// import { WelcomePage } from '../pages/welcome/welcome';
// import { MyAccountPage } from '../pages/my-account/my-account';
import { CartPage } from '../pages/cart/cart';
// import { SettingsPage } from '../pages/settings/settings';
import { CategoriesPage } from '../pages/categories/categories';
// import { WishListPage } from '../pages/wish-list/wish-list';
import { MyOrderPage } from '../pages/my-order/my-order';
// end import pages

import { TranslateService } from 'ng2-translate';
import { LocalStorageService } from '../services/local-storage';

@Component({
  templateUrl: 'app.html',
  queries: {
    nav: new ViewChild('content')
  }
})
export class MyApp {
  public user: any = null;

  public rootPage: any;
  public nav: any;
  public pages = [
    {
      title: 'Domů',
      icon: 'ios-home-outline',
      count: 0,
      component: HomePage
    },

    {
      title: 'Kategorie',
      icon: 'ios-list-box-outline',
      count: 0,
      component: CategoriesPage
    },

    // {
    //   title: 'WishList',
    //   icon: 'md-heart-outline',
    //   count: 2,
    //   component: WishListPage
    // },

    {
      title: 'Moje objednávky',
      icon: 'ios-timer-outline',
      count: 0,
      component: MyOrderPage
    },

    // {
    //   title: 'My Account',
    //   icon: 'ios-contact-outline',
    //   count: 0,
    //   component: MyAccountPage
    // },

    {
      title: 'Košík',
      icon: 'ios-cart-outline',
      count: 1,
      component: CartPage
    },

    // {
    //   title: 'Settings',
    //   icon: 'ios-settings-outline',
    //   count: 0,
    //   component: SettingsPage
    // }
    // import menu
  ];

  constructor(
    public platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private translate: TranslateService,
    private localStorageService: LocalStorageService
  ) {
    this.rootPage = HomePage;

    var userLang = navigator.language.split('-')[0];
    userLang = /(cz|en)/gi.test(userLang) ? userLang : 'en';
    userLang = 'cz'; //TODO: remove for production
    translate.setDefaultLang(userLang);
    translate.use(userLang);
    this.localStorageService.set('lang', userLang);

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  login() {
    return;
  }

  logout() {
    return;
  }

  register() {
    return;
  }
}


