import { Injectable } from "@angular/core";
import { FileService } from "./file-service";
import { AdminService } from "./admin-service";
import { Utils } from "./utils-service";
import { Item } from "../models/item";
import { KoreaService } from "./korea-service";

@Injectable()
export class ItemService {
  private items: any;

  constructor(
    private fileService: FileService,
    private koreaService: KoreaService,
    private adminService: AdminService
  ) {
  }

  getAll() {
    if (this.adminService.idParam === "5a3a816eda4eef666f98acf7") {
      return this.koreaService.getHome();
    } else {
      return this.fileService.get("products").then(result => {
        this.items = Utils.objectToArrayStoreKeys(result);
        return this.items.map(x => Utils.createObjectFromType(Item, x));
      });
    }
  }

  getByCategory(key: string): Promise<any> {
    if (this.adminService.idParam === "5a3a816eda4eef666f98acf7") {
      return this.koreaService.getByCategory(key).then(items => {
        this.items = items;
        return this.items.map(x => Utils.createObjectFromType(Item, x));
      });
    } else {
      return this.fileService.get("products").then(result => {
        this.items = Utils.objectToArrayStoreKeys(result);
        this.items = this.items.filter(x => x.categories.indexOf(key) > -1);
        return this.items.map(x => Utils.createObjectFromType(Item, x));
      })
    }
  }

  getItem(key: string): Promise<any> {
    if (this.adminService.idParam === "5a3a816eda4eef666f98acf7") {
      return this.koreaService.getItem(key).then(item => {
        return Utils.createObjectFromType(Item, item);
      });
    } else {
      return this.fileService.get("products." + key).then(item => {
        item.key = key;
        return Utils.createObjectFromType(Item, item);
      });
    }
  }

  remove(item) {
    this.items.splice(this.items.indexOf(item), 1);
  }
}
