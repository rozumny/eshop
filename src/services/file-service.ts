import { Injectable } from '@angular/core';
// import { User } from '../models/user';
import { Headers, Http, RequestOptions } from '@angular/http';
import { SigninService } from './signin-service';
// import { MemoryService } from "./memory-service";
import { AdminService } from "./admin-service";

@Injectable()
export class FileService {

    // public url = "http://localhost:8083";
    public url = "http://81.201.62.19:8083";
    public apiUrl: string = this.url + "/api/files/";

    constructor(
        private http: Http,
        // private memoryService: MemoryService,
        private signinService: SigninService,
        private adminService: AdminService
    ) {
    }

    get(key: string, userId?: string, hasAdminId?: boolean): Promise<any> {
        return new Promise<void>((resolve, reject) => {
            var headers = new Headers();
            // potrebuju tohle?
            // if (this.signinService.user) {
            //     headers.append('x-access-token', this.signinService.user.token);
            // }

            if (hasAdminId) {
                headers.append('admin-id', this.adminService.idParam);
            }

            if (userId) {
                headers.append('user-id', userId);
            } else if (this.adminService.idParam) {
                headers.append('user-id', this.adminService.idParam);
            }

            var options = new RequestOptions({ headers: headers });

            this.http.get(this.apiUrl + key, options)
                // .map(res => res.json())
                .subscribe(response => {
                    resolve(response.json().value);
                }, error => {
                    reject(error);
                });
        });
    }

    set(key: string, value: any): Promise<any> {
        return new Promise<void>((resolve, reject) => {
            var headers = new Headers();
            if (this.signinService.user)
                headers.append('x-access-token', this.signinService.user.token);
            var options = new RequestOptions({ headers: headers });

            this.http.put(this.apiUrl + key, { value: value }, options)
                .subscribe(response => {
                    resolve();
                }, error => {
                    reject(error);
                });
        });
    }

    delete(key: string): Promise<any> {
        return new Promise<void>((resolve, reject) => {
            var headers = new Headers();
            if (this.signinService.user)
                headers.append('x-access-token', this.signinService.user.token);
            var options = new RequestOptions({ headers: headers });

            this.http.delete(this.apiUrl + key, options)
                .subscribe(response => {
                    resolve();
                }, error => {
                    reject(error);
                });
        });
    }

    uploadFile(files: FileList): Promise<any> {
        return new Promise<void>((resolve, reject) => {
            var headers = new Headers();
            if (this.signinService.user)
                headers.append('x-access-token', this.signinService.user.token);

            //headers.append("Content-Type", undefined)
            var options = new RequestOptions({ headers: headers });

            var formData = new FormData();
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                formData.append('uploads[]', file, file.name);
            }

            this.http.post(this.apiUrl + 'upload', formData, options)
                .subscribe(response => {
                    resolve(response.json());
                }, error => {
                    reject(error);
                });
        });
    }

    deleteFile(filename: string): Promise<any> {
        if (!filename)
            return Promise.resolve();

        return new Promise<void>((resolve, reject) => {
            var headers = new Headers();
            if (this.signinService.user)
                headers.append('x-access-token', this.signinService.user.token);
            var options = new RequestOptions({ headers: headers });

            this.http.delete(this.apiUrl + 'upload/' + filename, options)
                .subscribe(response => {
                    resolve(response.json());
                }, error => {
                    reject(error);
                });
        });
    }
}
