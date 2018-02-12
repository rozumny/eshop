import { Component } from '@angular/core';
import { Platform, MenuController } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// import pages
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
// import { WelcomePage } from '../pages/welcome/welcome';
import { MyAccountPage } from '../pages/my-account/my-account';
import { CartPage } from '../pages/cart/cart';
// import { SettingsPage } from '../pages/settings/settings';
import { CategoriesPage } from '../pages/categories/categories';
// import { WishListPage } from '../pages/wish-list/wish-list';
import { MyOrderPage } from '../pages/my-order/my-order';
// end import pages

import { Cart } from '../models/cart';
import { CartService } from '../services/cart-service';
import { Store } from '@ngrx/store';
import { TranslateService } from 'ng2-translate';
import { LocalStorageService } from '../services/local-storage';
import { SigninService } from '../services/signin-service';
import { PagesService } from '../services/page-service';
import { UserPage } from '../pages/user-page/user-page';
import { RecipesPage } from '../pages/recipes/recipes';
import { AdminService } from '../services/admin-service';
import { APP_VERSION } from './version';

@Component({
  templateUrl: 'app.html',
  queries: {
    nav: new ViewChild('content')
  }
})
export class MyApp {
  public user: any = null;
  public cart: Cart;
  public version: string = APP_VERSION;

  public rootPage: any = HomePage;
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

    // {
    //   title: 'Settings',
    //   icon: 'ios-settings-outline',
    //   count: 0,
    //   component: SettingsPage
    // }
    // import menu

    // {
    //   title: 'My Account',
    //   icon: 'ios-contact-outline',
    //   count: 0,
    //   component: MyAccountPage
    // },
  ];
  public userPages = [];

  constructor(
    public platform: Platform,
    private statusBar: StatusBar,
    public menu: MenuController,
    private cartService: CartService,
    private store: Store<string>,
    private signinService: SigninService,
    private pageService: PagesService,
    public adminService: AdminService,
    private splashScreen: SplashScreen,
    private translate: TranslateService,
    private localStorageService: LocalStorageService
  ) {
    var userLang = navigator.language.split('-')[0];
    userLang = /(cz|en)/gi.test(userLang) ? userLang : 'en';
    userLang = 'cz'; //TODO: remove for production
    this.translate.setDefaultLang(userLang);
    this.translate.use(userLang);
    this.localStorageService.set('lang', userLang);

    this.pageService.getAll().then(pages => {
      this.userPages = pages;
    });

    this.cartService.get().then((cart: Cart) => {
      this.cart = cart;
    });

    this.store.select('user').subscribe(() => {
      this.user = this.signinService.user;
    });

    platform.ready().then(() => {
      this.statusBar.hide();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  openUserPage(page) {
    this.nav.setRoot(UserPage, page);
  }

  openMyOrders() {
    this.nav.setRoot(MyOrderPage);
  }

  openMyAccount() {
    this.nav.setRoot(MyAccountPage);
  }

  openCart() {
    this.nav.setRoot(CartPage);
  }

  openRecipes() {
    this.nav.setRoot(RecipesPage);
  }

  login() {
    this.nav.push(LoginPage);
  }

  logout() {
    this.signinService.signout().then(() => {
      this.nav.setRoot(HomePage).then(() => {
        this.menu.close();
      })
    })
  }

  register() {
    this.nav.push(RegisterPage);
  }
}


