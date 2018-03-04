import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store';
import { ADD, REMOVE, REMOVEQUANTITY, CLEAR } from '../reducers/cart';
import { Cart } from '../models/cart';
import { ItemService } from './item-service';
import { FileService } from './file-service';
import { Utils } from './utils-service';
import { SigninService } from './signin-service';
import { AdminService } from './admin-service';
import { KoreaService } from './korea-service';
import { UUID } from 'angular2-uuid';

@Injectable()
export class CartService {
  constructor(
    private store: Store<string>,
    private itemService: ItemService,
    private koreaService: KoreaService,
    private adminService: AdminService,
    private signinService: SigninService,
    private fileService: FileService
  ) {
  }

  public get(): Promise<Cart> {
    return new Promise<Cart>((resolve, reject) => {
      this.store.select('cart').subscribe((cart: Cart) => {
        resolve(cart);
      });
    });
  }

  public add(item: any) {
    this.store.dispatch({ type: ADD, payload: item });
  }

  public remove(item: any) {
    this.store.dispatch({ type: REMOVE, payload: item });
  }

  public removeQuantity(item: any) {
    this.store.dispatch({ type: REMOVEQUANTITY, payload: item });
  }

  public clear() {
    this.store.dispatch({ type: CLEAR });
  }

  public order(cart: Cart): Promise<any> {
    let promises = this.adminService.data.type === 2 ? cart.items.map(x => this.itemService.getItem(x.item.title)) : cart.items.map(x => this.itemService.getItem(x.item.key));
    return Promise.all(promises).then(result => {
      result.forEach(item => {
        item.amount -= cart.items.find(x => this.adminService.data.type === 2 ? x.item.title === item.title : x.item.key === item.key).quantity;
      })

      let promises2;
      if (this.adminService.idParam === "5a3a816eda4eef666f98acf7") {
        promises2 = result.map(x => this.koreaService.setAmount(x.key, x.amount));
      } else {
        promises2 = result.map(x => this.fileService.set("products." + x.key + ".amount", x.amount));
      }
      return Promise.all(promises2).then(() => {
        let orderId = UUID.UUID();
        let d = new Date().toISOString();
        d = d.substring(0, d.length - 8);
        cart.date = d;
        cart.state = 0;

        let order = {};
        order['order'] = Utils.clone(cart);
        order['order'].key = orderId;
        order['productPrice'] = cart.getSubtotal();
        order['shippingPrice'] = cart.getPostage();
        order['paymentPrice'] = cart.getPayment();
        order['extraPrice'] = cart.getExtraPostage();
        order['total'] = cart.getTotal();
        order['admin'] = this.adminService.data;

        return this.signinService.notifyorder(order).then(x => {
          return this.fileService.set("orders." + orderId, cart);
        });
      });
    });
  }

  public checkOrder(cart: Cart): Promise<any> {
    let promises = this.adminService.data.type === 2 ? cart.items.map(x => this.itemService.getItem(x.item.title)) : cart.items.map(x => this.itemService.getItem(x.item.key));
    return Promise.all(promises).then(result => {
      return Promise.resolve({
        success: result.every(x => parseInt(x.amount) >= cart.items.find(y => this.adminService.data.type === 2 ? y.item.title === x.title : y.item.key === x.key).quantity),
        failed: result.filter(x => parseInt(x.amount) < cart.items.find(y => this.adminService.data.type === 2 ? y.item.title === x.title : y.item.key === x.key).quantity).map(y => y.key === cart.items.find(z => this.adminService.data.type === 2 ? z.item.title === y.title : z.item.key === y.key))
      });
    });
  }
}
