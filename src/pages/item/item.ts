import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { ItemService } from '../../services/item-service';
import { ModalService } from '../../services/modal-service';
// import { ModalItemOptionPage } from "../modal-item-option/modal-item-option";
import { FileService } from '../../services/file-service';
import { CartService } from '../../services/cart-service';
import { CartPage } from '../cart/cart';

@Component({
  selector: 'page-item',
  templateUrl: 'item.html'
})
export class ItemPage {
  public item: any = {};

  constructor(public nav: NavController,
    public itemService: ItemService,
    private navParams: NavParams,
    private modalService: ModalService,
    private cartService: CartService,
    public fileService: FileService,
    public modalCtrl: ModalController
  ) {
    this.modalService.showWait(this.itemService.getItem(this.navParams.get("key"))).then(item => {
      this.item = item;
    });
  }

  // add or remove item on wish list
  // toggleWishList(item) {
  //   item.on_wish_list = !item.on_wish_list;
  // }

  // get item options group name
  getOptionGroupsName(item) {
    let optionGroups = [];
    for (let i = 0; i < item.option_groups.length; i++) {
      optionGroups.push(item.option_groups[i].name);
    }

    return optionGroups.join(',');
  }

  // make array with range is n
  // range(n) {
  //   return new Array(n);
  // }

  buy(item) {
    this.showOptions(item).then(() => {
      this.cartService.add(item);
      this.nav.setRoot(CartPage)
    });
  }

  addToCart(item) {
    this.showOptions(item).then(() => {
      this.cartService.add(item);
      this.modalService.createToast("item_added_to_cart").present();
      this.nav.pop();
    });
  }


  // open item option modal
  showOptions(item): Promise<any> {
    return Promise.resolve();
    // // show modal
    // let modal = this.modalCtrl.create(ModalItemOptionPage, { item: item });

    // // listen for modal close
    // modal.onDidDismiss(confirm => {
    //   if (confirm) {
    //     // apply filter here
    //   } else {
    //     // do nothing
    //   }
    // });

    // modal.present();
  }
}
