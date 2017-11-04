import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';

// import services
import { CategoryService } from '../services/category-service';
import { ItemService } from '../services/item-service';
import { UserService } from '../services/user-service';
import { StoreService } from '../services/store-service';
import { CartService } from '../services/cart-service';
import { OrderService } from '../services/order-service';
import { NewsService } from '../services/news-service';
import { FileService } from '../services/file-service';
import { SigninService } from '../services/signin-service';
import { Utils } from '../services/utils-service';
// end import services

// import pages
import { CartPage } from '../pages/cart/cart';
import { CategoriesPage } from '../pages/categories/categories';
import { CategoryPage } from '../pages/category/category';
import { ChangePasswordPage } from '../pages/change-password/change-password';
import { CurrencyConverterPage } from '../pages/currency-converter/currency-converter';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
import { HomePage } from '../pages/home/home';
import { ItemPage } from '../pages/item/item';
import { LoginPage } from '../pages/login/login';
import { ModalFilterPage } from '../pages/modal-filter/modal-filter';
import { ModalItemOptionPage } from '../pages/modal-item-option/modal-item-option';
import { MyAccountPage } from '../pages/my-account/my-account';
import { MyOrderPage } from '../pages/my-order/my-order';
import { OrderConfirmPage } from '../pages/order-confirm/order-confirm';
import { RegisterPage } from '../pages/register/register';
import { SearchPage } from '../pages/search/search';
import { SettingsPage } from '../pages/settings/settings';
import { StorePage } from '../pages/store/store';
import { TabAttributePage } from '../pages/tab-attribute/tab-attribute';
import { TabFilterPage } from '../pages/tab-filter/tab-filter';
import { WelcomePage } from '../pages/welcome/welcome';
import { WishListPage } from '../pages/wish-list/wish-list';
// end import pages

import { APP_TRANSLATIONS } from '../app/translations';
import { Observable } from 'rxjs/Observable';
import { TranslateLoader, TranslateModule } from 'ng2-translate/ng2-translate';
import { StoreModule, combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
import { localStorageSync } from 'ngrx-store-localstorage';
import { user } from '../reducers/user';

export class myTranslationLoader implements TranslateLoader {
  public getTranslation(lang: string): Observable<any> {
    let result = {};
    Object.keys(APP_TRANSLATIONS).forEach(function (key) {
      result[key] = APP_TRANSLATIONS[key][lang];
    });
    console.debug('Translations loaded for "' + lang + '"');
    return Observable.of(result);
  }
}

@NgModule({
  declarations: [
    MyApp,
    CartPage,
    CategoriesPage,
    CategoryPage,
    ChangePasswordPage,
    CurrencyConverterPage,
    ForgotPasswordPage,
    HomePage,
    ItemPage,
    LoginPage,
    ModalFilterPage,
    ModalItemOptionPage,
    MyAccountPage,
    MyOrderPage,
    OrderConfirmPage,
    RegisterPage,
    SearchPage,
    SettingsPage,
    StorePage,
    TabAttributePage,
    TabFilterPage,
    WelcomePage,
    WishListPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
      backButtonIcon: 'ios-arrow-back-outline'
    }),
    TranslateModule.forRoot({ provide: TranslateLoader, useClass: myTranslationLoader }),
    StoreModule.provideStore(
      compose(
        localStorageSync(['user'], true),
        combineReducers
      )({ user }))
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CartPage,
    CategoriesPage,
    CategoryPage,
    ChangePasswordPage,
    CurrencyConverterPage,
    ForgotPasswordPage,
    HomePage,
    ItemPage,
    LoginPage,
    ModalFilterPage,
    ModalItemOptionPage,
    MyAccountPage,
    MyOrderPage,
    OrderConfirmPage,
    RegisterPage,
    SearchPage,
    SettingsPage,
    StorePage,
    TabAttributePage,
    TabFilterPage,
    WelcomePage,
    WishListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CategoryService,
    ItemService,
    UserService,
    StoreService,
    CartService,
    OrderService,
    NewsService,
    FileService,
    SigninService,
    Utils
    /* import services */
  ]
})
export class AppModule {
}
