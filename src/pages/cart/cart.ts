import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
// import { OrderConfirmPage } from "../order-confirm/order-confirm";
import { HomePage } from '../home/home';
import { Cart } from '../../models/cart';
import { FileService } from '../../services/file-service';
import { ModalService } from '../../services/modal-service';
import { CartService } from '../../services/cart-service';

@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html'
})
export class CartPage {
  public user: any = null;
  public cart: Cart;
  public total: number;

  constructor(
    public nav: NavController,
    public fileService: FileService,
    public modalService: ModalService,
    private cartService: CartService

  ) {
    this.cartService.get().then((cart: Cart) => {
      this.cart = cart;
    })
  }

  remove(item) {
    this.cartService.remove(item.item);
  }

  addQuantity(item) {
    if (item.quantity >= item.item.amount) {
      this.modalService.createToast("cart_order_amount_message").present();
    }
    this.cartService.add(item.item);
  }

  removeQuantity(item) {
    this.cartService.removeQuantity(item.item);
  }

  // place order
  buy() {
    if (!this.cart.items.find(x => x.quantity > 0)) {
      this.modalService.createToast("cart_empty_message").present();
      return;
    }

    this.modalService.showWait(
      this.cartService.checkOrder(this.cart).then(result => {
        if (result.success) {
          return this.cartService.order(this.cart).then(result => {
            this.modalService.createToast("cart_order_message").present();
            this.cartService.clear();
            this.nav.setRoot(HomePage)
          });
        } else {
          return this.modalService.createToast("cart_order_amount_message").present();
        }
      }));
  }

  register() {
    return;
  }

  noregister() {
    this.user = {};
  }

  signin() {
    return;
  }
}
