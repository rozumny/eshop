import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CategoryService } from '../../services/category-service';
import { ModalService } from '../../services/modal-service';
import { CategoryPage } from '../category/category';
import { CartPage } from "../cart/cart";
import { ShoptetxmlfeedService } from '../../services/shoptetxmlfeed-service';
import { AdminService } from '../../services/admin-service';

@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html'
})
export class CategoriesPage {
  // list of categories
  public categories: any[];

  constructor(
    public nav: NavController,
    private adminService: AdminService,
    public categoryService: CategoryService,
    private shoptetxmlfeedService: ShoptetxmlfeedService,
    public modalService: ModalService
  ) {

    let p = this.adminService.data.type === 2 ? this.shoptetxmlfeedService.getAllCategories() : categoryService.getAll();
    this.modalService.showWait(p).then(categories => {
      this.categories = categories;
    });
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
