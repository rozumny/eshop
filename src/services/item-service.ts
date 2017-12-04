import { Injectable } from "@angular/core";
import { FileService } from "./file-service";
import { Utils } from "./utils-service";
import { Item } from "../models/item";

@Injectable()
export class ItemService {
  private items: any;

  constructor(private fileService: FileService) {
  }

  getAll() {
    return this.fileService.get("products").then(result => {
      this.items = Utils.objectToArrayStoreKeys(result);
      return this.items.map(x => Utils.createObjectFromType(Item, x));
    })
  }

  getByCategory(key: string): Promise<any> {
    return this.fileService.get("products").then(result => {
      this.items = Utils.objectToArrayStoreKeys(result);
      this.items = this.items.filter(x => x.categories.indexOf(key) > -1);
      return this.items.map(x => Utils.createObjectFromType(Item, x));
    })
  }

  getItem(key: string): Promise<any> {
    return this.fileService.get("products." + key).then(item => {
      item.key = key;
      return Utils.createObjectFromType(Item, item);
    });
  }

  remove(item) {
    this.items.splice(this.items.indexOf(item), 1);
  }
}
