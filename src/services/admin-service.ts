import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { StyleService } from "../services/style-service";

@Injectable()
export class AdminService {

    public idParam: string;
    public data: any;

    public url = "http://81.201.62.19:8083";
    // public url = "http://localhost:8083";
    public apiUrl: string = this.url + "/api/admins/";

    constructor(
        private http: Http,
        private styleService: StyleService
    ) {
    }

    get(link: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            if (this.idParam) {
                resolve(this.data);
            }
            this.http.get(this.apiUrl + "link/" + link)
                .subscribe(response => {
                    let result = response.json();
                    this.idParam = result._id;
                    this.data = result;
                    this.styleService.apply({
                        primaryColor: result.color,
                        headerBackgroundColor: result.color,
                        headerBackgroundModalsColor: result.color
                    });
                    resolve(result);
                }, error => {
                    reject(error);
                });
        });
    }

}
