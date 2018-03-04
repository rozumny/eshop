import { Injectable } from "@angular/core";
import { Utils } from "./utils-service";
import { Headers, Http, RequestOptions } from '@angular/http';
import { AdminService } from "./admin-service";
import { FileService } from "./file-service";

@Injectable()
export class ShoptetxmlfeedService {
  private items: any;

  public url = "http://api.mobilni-eshop.cz";
  // public url = "http://localhost:8083";
  public apiUrl: string = this.url + "/api/shoptetxmlfeed/";

  constructor(
    private http: Http,
    private adminService: AdminService,
    private fileService: FileService,
    private utilsService: Utils
  ) {
  }

  getHome(): Promise<any> {
    return this.getAll().then(all => {
      return this.fileService.get("homeproducts").then(homeProducts => {
        return Utils.objectToArrayStoreKeys(homeProducts).map(h => all.find(x => x.title === h.product.title))
      });
    });
  }

  getAll(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      var headers = new Headers();
      if (this.adminService.data) {
        headers.append('admin-name', this.adminService.data.username);
      }
      var options = new RequestOptions({ headers: headers });
      this.http.get(this.apiUrl + "getallproducts", options)
        .map(res => res.json())
        .subscribe(response => {
          this.items = response.value;
          resolve(response.value);
        }, error => {
          reject(error);
        });
    });
  }

  getByCategory(id) {
    return Promise.resolve(this.items.filter(x => x.categories.indexOf(id) > -1));
  }

  getItem(id) {
    return new Promise<any>((resolve, reject) => {
      resolve(this.items.find(x => x.key === id));
    });
  }

  getAllCategories(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      let cats = [];
      this.items.forEach(x => {
        x.categories.forEach(category => {
          if (!cats.find(x => x.title === category)) {
            cats.push({ title: category });
          }
        });
      });
      resolve(cats);
    });
  }

  getHomeCategories(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      //   this.http.get(this.apiUrl + "gethomecategories")
      //     .subscribe(response => {
      //       let r = response.json().value;
      //       resolve(r);
      //     }, error => {
      //       reject(error);
      //     });
    });
  }
}
