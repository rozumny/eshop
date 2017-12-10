import { NgModule, LOCALE_ID } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';

//pipe
import { SafeHtmlPipe } from '../pipes/safe-html-pipe';

// import components
import { NewForms } from '../components/forms/newForms';
import { Text } from '../components/forms/controls/text/text';
import { Header } from '../components/forms/controls/header/header';
import { Linebreak } from '../components/forms/controls/linebreak/linebreak';
import { TextArea } from '../components/forms/controls/textarea/textarea';
import { Paragraph } from '../components/forms/controls/paragraph/paragraph';
import { Color } from '../components/forms/controls/color/color';
import { Email } from '../components/forms/controls/email/email';
import { DateControl } from '../components/forms/controls/date/date';
import { FormButton } from '../components/forms/controls/formbutton/formbutton';
import { Checkbox } from '../components/forms/controls/checkbox/checkbox';
import { LocalizedText } from '../components/forms/controls/localizedtext/localizedtext';
import { MultiSelectControl } from '../components/forms/controls/multiselectcontrol/multiselectcontrol';
import { MultiCheckboxControl } from '../components/forms/controls/multicheckboxcontrol/multicheckboxcontrol';
import { RadioControl } from '../components/forms/controls/radio/radio';
import { Number } from '../components/forms/controls/number/number';
import { Password } from '../components/forms/controls/password/password';
import { Range } from '../components/forms/controls/range/range';

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
import { LocalStorageService } from '../services/local-storage';
import { ModalService } from '../services/modal-service';
import { MemoryService } from '../services/memory-service';
import { Utils } from '../services/utils-service';
import { FormService } from '../services/form-service';
import { FormsService } from '../services/forms-service';
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

//reducers
import { user } from '../reducers/user';
import { cart } from '../reducers/cart';

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
    WishListPage,

    // pipes
    SafeHtmlPipe,

    // components
    NewForms,
    Paragraph,
    Text,
    Email,
    Header,
    Linebreak,
    TextArea,
    FormButton,
    Checkbox,
    LocalizedText,
    MultiSelectControl,
    MultiCheckboxControl,
    RadioControl,
    Number,
    Color,
    DateControl,
    Password,
    Range
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
      locationStrategy: 'path'
    },
      {
        links: [
          { component: HomePage, name: 'Home' },
          { component: HomePage, name: 'Home', segment: ':id' }
        ]
      }
    ),
    TranslateModule.forRoot({ provide: TranslateLoader, useClass: myTranslationLoader }),
    StoreModule.provideStore(
      compose(
        localStorageSync(['user'], true),
        combineReducers
      )({ user, cart }))
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
    WishListPage,

    // components
    NewForms,
    Paragraph,
    Text,
    Header,
    Email,
    Linebreak,
    TextArea,
    FormButton,
    Checkbox,
    LocalizedText,
    MultiSelectControl,
    MultiCheckboxControl,
    RadioControl,
    Number,
    Color,
    DateControl,
    Password,
    Range
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'cs-CS'
    },
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
    ModalService,
    MemoryService,
    Utils,
    LocalStorageService,
    FormService,
    FormsService
    /* import services */
  ]
})
export class AppModule {
}
