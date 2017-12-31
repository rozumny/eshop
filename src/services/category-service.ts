import { Injectable } from "@angular/core";
import { FileService } from "./file-service";
import { Utils } from "./utils-service";
import { KoreaService } from "./korea-service";
import { AdminService } from "./admin-service";

@Injectable()
export class CategoryService {
  private categories: any;

  constructor(private fileService: FileService,
    private koreaService: KoreaService,
    private adminService: AdminService) {
  }

  getHome(): Promise<any[]> {
    if (this.adminService.idParam === "5a3a816eda4eef666f98acf7") {
      return this.koreaService.getHomeCategories().then(categories => {
        this.categories = categories;
        return this.categories;
      });
    } else {
      return this.fileService.get("categories").then(result => {
        this.categories = Utils.objectToArrayStoreKeys(result);
        this.categories = this.categories.filter(x => x.showOnHome);
        return this.categories;
      })
    }
  }

  getAll(): Promise<any[]> {
    if (this.adminService.idParam === "5a3a816eda4eef666f98acf7") {
      return this.koreaService.getAllCategories().then(categories => {
        this.categories = categories;
        return this.categories;
      });
    } else {
      return this.fileService.get("categories").then(result => {
        this.categories = Utils.objectToArrayStoreKeys(result);
        return this.categories;
      })
    }
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
