import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store';
import { ADD, REMOVE, REMOVEQUANTITY, CLEAR } from '../reducers/cart';
import { Cart } from '../models/cart';
import { ItemService } from './item-service';
import { FileService } from './file-service';
import { UUID } from 'angular2-uuid';

@Injectable()
export class CartService {
  constructor(
    private store: Store<string>,
    private itemService: ItemService,
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
    let promises = cart.items.map(x => this.itemService.getItem(x.item.key));
    return Promise.all(promises).then(result => {
      result.forEach(item => {
        item.amount -= cart.items.find(x => x.item.key === item.key).quantity;
      })
      let promises2 = result.map(x => this.fileService.set("products." + x.key + ".amount", x.amount));
      return Promise.all(promises2).then(() => {
        let orderId = UUID.UUID();
        cart.date = new Date();
        cart.state = 0;
        return this.fileService.set("orders." + orderId, cart);
      });
    });
  }

  public checkOrder(cart: Cart): Promise<any> {
    let promises = cart.items.map(x => this.itemService.getItem(x.item.key));
    return Promise.all(promises).then(result => {
      return Promise.resolve({
        success: result.every(x => parseInt(x.amount) >= cart.items.find(y => y.item.key === x.key).quantity),
        failed: result.filter(x => parseInt(x.amount) < cart.items.find(y => y.item.key === x.key).quantity).map(y => y.key === cart.items.find(z => z.item.key === y.key))
      });
    });
  }
}
