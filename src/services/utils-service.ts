import { Injectable } from '@angular/core';

@Injectable()
export class Utils {
    static isCordova(): boolean {
        return !!(<any>window).cordova;
    }


    static objectToArrayStoreKeys(object: any): any[] {
        var result = [];
        for (var a in object) {
            if (object.hasOwnProperty(a)) {
                object[a].key = a;
                result.push(object[a]);
            }
        }
        return result;
    }

    static deepCloneObject(o: any) {
        return JSON.parse(JSON.stringify(o));
    }

    resolve(path, obj) {
        if (path.length === 0)
            return obj;

        return path ? path.split('.').reduce((prev, curr) => {
            return prev ? prev[curr] : null;
        }, obj || this) : null;
    }

    getEmptyObject(config) {
        if (config.type === 'localizedtext') {
            return {};
        } else if (config.type === 'checkbox') {
            return false;
        } else if (config.type === 'catalogitems' || config.type === 'track') {
            return [];
        } else {
            return '';
        }
    }

    getFieldName(path) {
        var pathArray = path.split('.');
        return path.split('.')[pathArray.length - 1];
    }

    setNested(object: any, path: string, value: any) {
        if (path.length === 0) {
            object = value;
        }
        var arrayPath = path.split('.');
        var tmp = object;
        var field = this.getFieldName(path);
        arrayPath.splice(arrayPath.length - 1);
        arrayPath.forEach(x => {
            if (tmp[x] === undefined || tmp[x] === null)
                tmp[x] = {};

            tmp = tmp[x];
        });

        tmp[field] = value;
    }

    createNested(path, obj) {
        var newObject = {};
        var start = newObject;
        var pathSplitArray = path.split('.');
        var i = 0;

        if (path.length === 0) {
            return obj;
        } else if (pathSplitArray.length === 1) {
            newObject[path] = obj;
            return newObject;
        } else {
            var keys = path.split('.');
            keys.forEach(x => {
                if (i === pathSplitArray.length - 1) {
                    newObject[x] = obj;
                } else {
                    // if (keys.length > i + 1 && !isNaN(keys[i + 1])) {
                    //     newObject[x] = [];
                    // } else {
                    newObject[x] = {};
                    // }
                }

                newObject = newObject[x];
                i++;
            });

            return start;
        }
    }

    mergeChanges(change1, change2) {
        for (var prop in change2) {
            change1[prop] = change2[prop];
        }
    }
}
