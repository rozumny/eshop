import { Injectable } from "@angular/core";
// import { FileService } from "./file-service";
// import { Utils } from "./utils-service";
import { Http } from '@angular/http';

@Injectable()
export class KoreaService {
  private items: any;
  public url = "http://api.mobilni-eshop.cz";
  // public url = "http://localhost:8083";
  public apiUrl: string = this.url + "/api/korea/";

  constructor(private http: Http) {
  }

  getHome(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.get(this.apiUrl + "gethomeproducts")
        .subscribe(response => {
          let r = response.json().value;
          this.items = r;
          resolve(r);
        }, error => {
          reject(error);
        });
    });
  }

  getAll(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.get(this.apiUrl + "getallproducts")
        .subscribe(response => {
          let r = response.json().value;
          this.items = r;
          resolve(r);
        }, error => {
          reject(error);
        });
    });
  }

  getByCategory(id) {
    return new Promise<any>((resolve, reject) => {
      this.http.get(this.apiUrl + "getbycategory/" + id)
        .subscribe(response => {
          let r = response.json().value;
          resolve(r);
        }, error => {
          reject(error);
        });
    });
  }

  getItem(id) {
    return new Promise<any>((resolve, reject) => {
      this.http.get(this.apiUrl + "get/" + id)
        .subscribe(response => {
          let r = response.json().value;
          resolve(r);
        }, error => {
          reject(error);
        });
    });
  }

  getAllCategories(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.get(this.apiUrl + "getallcategories")
        .subscribe(response => {
          let r = response.json().value;
          resolve(r);
        }, error => {
          reject(error);
        });
    });
  }

  getHomeCategories(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.get(this.apiUrl + "gethomecategories")
        .subscribe(response => {
          let r = response.json().value;
          resolve(r);
        }, error => {
          reject(error);
        });
    });
  }

  getRecipes(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.get(this.apiUrl + "getrecipes")
        .subscribe(response => {
          let r = response.json().value;
          resolve(r);
        }, error => {
          reject(error);
        });
    });
  }

  setAmount(id: number, amount: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.post(this.apiUrl + "setamount", { id: id, amount: amount })
        .subscribe(response => {
          let r = response.json().value;
          resolve(r);
        }, error => {
          reject(error);
        });
    });
  }
}
