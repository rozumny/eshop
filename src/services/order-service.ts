import { Injectable } from "@angular/core";
import { ORDERS } from "./mock-orders";
import { FileService } from "./file-service";
import { Utils } from "./utils-service";
import { Cart } from "../models/cart";
import { Item } from "../models/item";

@Injectable()
export class OrderService {
  private orders: any;

  constructor(private fileService: FileService) {
    this.orders = ORDERS;
  }

  getAll(): Promise<any[]> {
    return this.fileService.get("orders").then(result => {
      this.orders = Utils.objectToArrayStoreKeys(result);
      this.orders = this.orders.map(x => Utils.createObjectFromType(Cart, x));
      this.orders.forEach(x => {
        x.items.forEach(y => {
          y.item = Utils.createObjectFromType(Item, y.item);
        })
      });
      this.orders.reverse();
      return this.orders;
    })
  }
}
