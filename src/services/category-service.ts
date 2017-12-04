import { Injectable } from "@angular/core";
import { FileService } from "./file-service";
import { Utils } from "./utils-service";

@Injectable()
export class CategoryService {
  private categories: any;

  constructor(private fileService: FileService) {
  }

  getAll(): Promise<any[]> {
    return this.fileService.get("categories").then(result => {
      this.categories = Utils.objectToArrayStoreKeys(result);
      return this.categories;
    })
  }

  getItem(id) {
    for (var i = 0; i < this.categories.length; i++) {
      if (this.categories[i].id === parseInt(id)) {
        return this.categories[i];
      }
    }
    return null;
  }

  remove(item) {
    this.categories.splice(this.categories.indexOf(item), 1);
  }
}
