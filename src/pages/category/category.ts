import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, ModalController } from 'ionic-angular';
import { ModalService } from '../../services/modal-service';
import { ItemService } from '../../services/item-service';
import { CategoryService } from '../../services/category-service';
import { ModalFilterPage } from "../modal-filter/modal-filter";
import { ItemPage } from "../item/item";
import { CartPage } from "../cart/cart";
import { FileService } from '../../services/file-service';
import { AdminService } from '../../services/admin-service';
import { ShoptetxmlfeedService } from '../../services/shoptetxmlfeed-service';

/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-category',
  templateUrl: 'category.html'
})
export class CategoryPage {
  // list items of this category
  public items: any;
  public url: string;

  // category info
  public category: any;

  // view type
  public viewType = 'list';

  // sort by
  public sortBy = 'Od nejlevnějšího';

  constructor(public nav: NavController,
    public itemService: ItemService,
    private adminService: AdminService,
    public categoryService: CategoryService,
    private navParams: NavParams,
    private modalService: ModalService,
    public modalCtrl: ModalController,
    private shoptetxmlfeedService: ShoptetxmlfeedService,
    public fileService: FileService,
    public actionSheetCtrl: ActionSheetController
  ) {
    // get list items of a category as sample
    this.category = this.navParams.get("category");
    this.url = this.fileService.url + '/';
    if (this.adminService.data.username === "info@jiznikorea.eu" ||
      this.adminService.data.username === "vsebesta@vinova.cz") {
      this.url = "";
    }

    let p = this.adminService.data.username === "vsebesta@vinova.cz" ? this.shoptetxmlfeedService.getByCategory(this.category.title) : this.itemService.getByCategory(this.category.key);

    this.modalService.showWait(p).then(items => {
      this.items = items;
    });
  }

  // switch to list view
  viewList() {
    this.viewType = 'list';
  }

  // swith to grid view
  viewGrid() {
    this.viewType = 'grid';
  }

  // get discount percent
  discountPercent(originPrice, salePrice) {
    return Math.round((salePrice - originPrice) * 100 / originPrice)
  }

  // choose sort by
  chooseSortBy() {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Od nejlevnějšího',
          handler: () => {
            this.sortBy = 'Od nejlevnějšího';
          }
        },
        {
          text: 'Od nejdražšího',
          handler: () => {
            this.sortBy = 'Od nejdražšího';
          }
        },
        {
          text: 'Zrušit',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  // show filter modal
  openFilter(tabName) {
    // show modal
    let modal = this.modalCtrl.create(ModalFilterPage, { tabName: tabName });

    // listen for modal close
    modal.onDidDismiss(confirm => {
      if (confirm) {
        // apply filter here
      } else {
        // do nothing
      }
    });

    modal.present();
  }

  // view a item
  viewItem(key) {
    this.nav.push(ItemPage, { key: key })
  }

  // view cart
  goToCart() {
    this.nav.setRoot(CartPage);
  }
}
