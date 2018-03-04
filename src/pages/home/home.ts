import { Component } from '@angular/core';
import { NavParams, NavController, Events } from 'ionic-angular';
import { CategoryService } from '../../services/category-service';
import { FileService } from '../../services/file-service';
import { ItemService } from '../../services/item-service';
import { CategoriesPage } from "../categories/categories";
import { CategoryPage } from "../category/category";
import { ItemPage } from "../item/item";
import { SearchPage } from "../search/search";
import { CartPage } from "../cart/cart";
import { AdminService } from '../../services/admin-service';
import { ModalService } from '../../services/modal-service';
import { TranslateService } from 'ng2-translate';
import { Cart } from '../../models/cart';
import { CartService } from '../../services/cart-service';
import { SlideService } from '../../services/slide-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public slides: any[];
  public cart: Cart;
  public categories: any[] = [];
  public items: any = [];
  public url: string = "";
  public title: string = this.translate.instant("title")

  constructor(public nav: NavController,
    public categoryService: CategoryService,
    public slideService: SlideService,
    public fileService: FileService,
    private events: Events,
    private modalService: ModalService,
    private cartService: CartService,
    private translate: TranslateService,
    private navParams: NavParams,
    private adminService: AdminService,
    public itemService: ItemService) {
    if (!this.adminService.idParam) {
      if (navParams.data.id) {
        this.modalService.showWait(this.adminService.get(this.navParams.data.id).then(data => {
          this.title = data.name;
          this.events.publish("updatePages");
          return this.init();
        }));
      } else { //fallback to korea eshop
        this.modalService.showWait(this.adminService.get("zameckesklepy").then(data => {
          this.title = data.name;
          this.events.publish("updatePages");
          return this.init();
        }));
      }
    } else {
      this.title = this.adminService.data.name;
      this.init();
    }
  }

  init(): Promise<any> {
    this.url = this.fileService.url + '/';
    if (this.adminService.data.username === "info@jiznikorea.eu" ||
      this.adminService.data.username === "vsebesta@vinova.cz") {
      this.url = "";
    }

    let promises = [];
    promises.push(this.categoryService.getHome().then(categories => {
      this.categories = categories;
    }));

    promises.push(this.slideService.getAll().then(slides => {
      if (slides.length > 0) {
        this.slides = slides;
      }
    }));

    promises.push(this.itemService.getAll().then(items => {
      this.items = items.filter(x => x.enable && x.enable_home);
    }));

    this.cartService.get().then((cart: Cart) => {
      this.cart = cart;
    });

    return Promise.all(promises);
  }

  // view categories
  viewCategories() {
    this.nav.push(CategoriesPage);
  }

  openSlide(slide) {
    if (slide.product) {
      this.nav.push(ItemPage, { key: slide.product.key })
    }
  }

  // view a category
  viewCategory(category) {
    this.nav.push(CategoryPage, { category: category });
  }

  // view a item
  viewItem(key) {
    this.nav.push(ItemPage, { key: key })
  }

  // go to search page
  goToSearch() {
    this.nav.push(SearchPage);
  }

  // view cart
  goToCart() {
    this.nav.setRoot(CartPage);
  }

  discountPercent(originPrice, salePrice) {
    return Math.round((salePrice - originPrice) * 100 / originPrice)
  }
}
