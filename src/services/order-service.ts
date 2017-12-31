import { Injectable } from "@angular/core";
import { ORDERS } from "./mock-orders";
import { FileService } from "./file-service";
import { Utils } from "./utils-service";
import { SigninService } from "./signin-service";
import { AdminService } from "./admin-service";
import { Cart } from "../models/cart";
import { Item } from "../models/item";

@Injectable()
export class OrderService {
  private orders: any;

  constructor(
    private fileService: FileService,
    private adminService: AdminService,
    private signinService: SigninService
  ) {
    this.orders = ORDERS;
  }

  getAll(): Promise<any[]> {
    return this.fileService.get("orders", this.signinService.user._id, true).then(result => {
      this.orders = Utils.objectToArrayStoreKeys(result);
      this.orders = this.orders.map(x => Utils.createObjectFromType(Cart, x));
      this.orders.forEach(x => {
        x.items.forEach(y => {
          y.item = Utils.createObjectFromType(Item, y.item);
          if (this.adminService.idParam !== "5a3a816eda4eef666f98acf7") {
            y.item.filenames.forEach(x => {
              x = this.fileService.url + "/" + x;
            });
          }
        });
      });
      this.orders.reverse();
      return this.orders;
    })
  }
}
