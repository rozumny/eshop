import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {
    _appName = 'mysins_';

    constructor() {
    }

    getObject(key: string, uselocal?: boolean): Promise<any> {
        return new Promise<any>(resolve => {
            var data = localStorage.getItem(uselocal ? key : this._appName + key);
            resolve(JSON.parse(data));
        });
    }

    setObject(key: string, data: any, uselocal?: boolean) {
        return new Promise<any>(resolve => {
            localStorage.setItem(uselocal ? key : this._appName + key, JSON.stringify(data));
            resolve();
        });
    }

    get(key: string, uselocal?: boolean): any {
        return new Promise<any>(resolve => {
            resolve(localStorage.getItem(uselocal ? key : this._appName + key));
        });
    }

    set(key: string, data: string, uselocal?: boolean) {
        return new Promise<any>(resolve => {
            localStorage.setItem(uselocal ? key : this._appName + key, data);
            resolve();
        });
    }
}

