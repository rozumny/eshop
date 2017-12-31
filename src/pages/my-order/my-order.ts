import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { OrderService } from "../../services/order-service";
import { SigninService } from "../../services/signin-service";
import { FileService } from "../../services/file-service";
import { ItemService } from "../../services/item-service";
import { ModalService } from "../../services/modal-service";
import { Utils } from "../../services/utils-service";

@Component({
  selector: 'page-my-order',
  templateUrl: 'my-order.html'
})
export class MyOrderPage {
  public orders: any;

  constructor(
    public nav: NavController,
    public modalService: ModalService,
    public orderService: OrderService,
    private itemService: ItemService,
    public signinService: SigninService,
    public fileService: FileService
  ) {
    this.modalService.showWait(orderService.getAll().then(data => {
      // this.orders = data.filter(x => x.userId === this.signinService.user._id);
      let promises = [];
      promises = data.map(order => {
        order.items.forEach(item => {
          return this.itemService.getItem(item.item.key).then(y => {
            item.item.filenames = y.filenames;
          });
        });
      })
      return Promise.all(promises).then(() => {
        this.orders = data;
      });
    }));
  }

  public getStateString(number: number) {
    return Utils.getStatus().find(x => x.value === number).label;
  }
}
