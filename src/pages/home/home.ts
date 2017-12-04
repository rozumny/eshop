import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CategoryService } from '../../services/category-service';
import { FileService } from '../../services/file-service';
import { ItemService } from '../../services/item-service';
import { CategoriesPage } from "../categories/categories";
import { CategoryPage } from "../category/category";
import { ItemPage } from "../item/item";
import { SearchPage } from "../search/search";
import { CartPage } from "../cart/cart";
import { MemoryService } from '../../services/memory-service';
import { ModalService } from '../../services/modal-service';
import { TranslateService } from 'ng2-translate';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // list slides for slider
  public slides = [
    {
      src: 'assets/img/slide_2.jpg'
    },
    {
      src: 'assets/img/slide_3.jpg'
    }
  ];

  public categories: any[] = [];
  public items: any = [];
  public title: string = this.translate.instant("title")

  constructor(public nav: NavController,
    public categoryService: CategoryService,
    public fileService: FileService,
    private modalService: ModalService,
    private translate: TranslateService,
    private navParams: NavParams,
    private memoryService: MemoryService,
    public itemService: ItemService) {
    if (this.navParams.data.id) {
      this.memoryService.idParam = "test"//this.navParams.data.id;
      this.title = this.navParams.data.id.toUpperCase();
    }

    let promises = [];
    promises.push(categoryService.getAll().then(categories => {
      this.categories = categories;
    }));

    promises.push(itemService.getAll().then(items => {
      this.items = items.filter(x => x.enable && x.enable_home);
    }));

    this.modalService.showWait(Promise.all(promises));
  }

  // view categories
  viewCategories() {
    this.nav.push(CategoriesPage);
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
}
