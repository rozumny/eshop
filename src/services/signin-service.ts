import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Store } from '@ngrx/store';
import { SETUSER } from '../reducers/user';

@Injectable()
export class SigninService {

    // public url = "http://localhost:8082";
    public url = "http://81.201.62.19:8083";
    public apiUrl: string = this.url + "/api/users/";
    public user: User;

    constructor(
        private store: Store<string>,
        private http: Http
    ) {
        this.store.select('user').subscribe((user: User) => {
            this.user = user;
        });
    }

    signout(): Promise<void> {
        this.store.dispatch({ type: SETUSER, payload: null });
        return Promise.resolve();
    }

    signin(username: string, password: string): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            var user = new User();
            user.username = username;
            user.password = password;
            this.http.post(this.apiUrl + "/auth/", user)
                .subscribe(response => {
                    this.store.dispatch({ type: SETUSER, payload: response.json() });
                    resolve(response.json());
                }, error => {
                    reject(error);
                });
        });
    }

    register(username: string, password: string, passwordRepeat: string, email: string): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            var user = new User();
            user.username = username;
            user.password = password;
            user.email = email;

            var headers = new Headers();
            headers.append('x-access-token', this.user.token);
            var options = new RequestOptions({ headers: headers });

            this.http.post(this.apiUrl, user, options)
                .subscribe(response => {
                    resolve(response.json());
                }, error => {
                    reject(error);
                });
        });
    }

    changeUser(user: User): Promise<any> {
        return new Promise<void>((resolve, reject) => {
            var headers = new Headers();
            headers.append('x-access-token', this.user.token);
            var options = new RequestOptions({ headers: headers });

            this.http.put(this.apiUrl, user, options)
                .subscribe(response => {
                    resolve();
                }, error => {
                    reject(error);
                });
        });
    }

    deleteUser(user: User): Promise<any> {
        return new Promise<void>((resolve, reject) => {
            var headers = new Headers();
            headers.append('x-access-token', this.user.token);
            var options = new RequestOptions({ headers: headers });

            this.http.delete(this.apiUrl + '/' + user._id, options)
                .subscribe(response => {
                    resolve();
                }, error => {
                    reject(error);
                });
        });
    }

    getUsers(): Promise<User[]> {
        return new Promise<User[]>((resolve, reject) => {
            var headers = new Headers();
            headers.append('x-access-token', this.user.token);
            var options = new RequestOptions({ headers: headers });

            this.http.get(this.apiUrl, options)
                .subscribe(response => {
                    resolve(response.json());
                }, error => {
                    reject(error);
                });
        });
    }
}
