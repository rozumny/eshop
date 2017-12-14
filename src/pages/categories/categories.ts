import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CategoryService } from '../../services/category-service';
import { ModalService } from '../../services/modal-service';
import { CategoryPage } from '../category/category';
import { CartPage } from "../cart/cart";

@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html'
})
export class CategoriesPage {
  // list of categories
  public categories: any[];

  constructor(
    public nav: NavController,
    public categoryService: CategoryService,
    public modalService: ModalService
  ) {
    this.modalService.showWait(categoryService.getAll().then(categories => {
      this.categories = categories;
    }));
  }

  // view category
  viewCategory(category) {
    this.nav.push(CategoryPage, { category: category });
  }

  // view cart
  goToCart() {
    this.nav.setRoot(CartPage);
  }
}
