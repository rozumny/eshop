import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';

@Injectable()
export class Utils {

    constructor() { }

    // usage:
    // Utils.logDebug('smth happened');
    // Utils.logDebug('smth happened', 42);
    // Utils.logDebug('smth happened', {
    //   interestingValue: 43
    // });
    static logDebug(header: string, logObj?: any): void {
        if (logObj !== null && typeof logObj === 'object') {
            let keys = Object.keys(logObj);
            if (keys.length > 1) {
                console.debug(header, '(', logObj[keys[0]], ')');
                keys.forEach(key => {
                    console.debug('        ', key + ': ', logObj[key]);
                });
            } else if (keys.length === 1) {
                console.debug(header, '(' + keys[0] + ')');
                console.debug('        ', keys[0] + ': ', logObj[keys[0]]);
            } else {
                console.debug(header);
            }
        } else if (typeof logObj === 'string') {
            console.debug(header + ' (' + logObj + ')');
        } else if (typeof logObj === 'undefined') {
            console.debug(header);
        } else {
            console.debug(header + ' (', logObj, ')');
        }
    }

    static assert(isOK: boolean, message: string): void {
        if (!isOK) {
            console.error(message)
        }
    }

    static logTime(name): void {
        if (console && console.time) {
            console.time(name);
        } else {
            console.debug(name + ' begin');
        }
    }

    static logTimeEnd(name): void {
        if (console && console.timeEnd) {
            console.timeEnd(name);
        } else {
            console.debug(name + ' end');
        }
    }

    static comparebyPosition(a: any, b: any): number {
        if (a.position === b.position) {
            return 0;
        }
        return a.position > b.position ? 1 : -1;
    }

    static getUID(): string {
        return UUID.UUID();
    }

    static isCordova(): boolean {
        return !!(<any>window).cordova;
    }

    static isElectron(): boolean {
        return window && (<any>window).process && (<any>window).process.type;
    }

    static isIsPhoneOrIpad(): boolean {
        const userAgent = window.navigator.userAgent;
        return (!!userAgent.match(/iPad/i) || !!userAgent.match(/iPhone/i));
    }

    static isBlank(value: string): boolean {
        return !value || !value.trim();
    }

    static objectToArrayStoreKeys(object: any): any[] {
        let result = [];
        for (let a in object) {
            if (object.hasOwnProperty(a)) {
                object[a].key = a;
                result.push(object[a]);
            }
        }
        return result;
    }

    static objectToArray(object: any): any[] {
        let result = [];
        for (let a in object) {
            if (object.hasOwnProperty(a)) {
                result.push(object[a]);
            }
        }
        return result;
    }

    static sanitizeKey(key: string) {
        return key.replace('.', '__');
    }

    static desanitizeKey(key: string) {
        return key.replace('__', '.');
    }

    /*
        Returns text having symbols occured in the text with their values.
        When a symbol, recognized by ${}, is not found in the symbols map, it is not replaced.
        $ Utils.interpolate('person pk = ${currentPersonPK}', new Map([['currentPersonPK', '1116666']]));
        > 'person pk 11666'
    */
    static interpolate(text: string, symbols: Map<string, string>): string {

        function substitueSymbol(match): string {
            let symbol = match.substring(2, match.length - 1);
            return symbols.get(symbol) || match;
        }

        return text.replace(/\${([A-Z]|[a-z])+}/g, substitueSymbol);
    }

    /*
        unicodeToBase64('✓ à la mode'); // "4pyTIMOgIGxhIG1vZGU="
        unicodeToBase64('\n'); // "Cg=="
    */
    // TODO fix 'Character Out Of Range' when used for str with unicode characters
    // https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#Solution_.232_.E2.80.93_rewriting_atob()_and_btoa()_using_TypedArrays_and_UTF-8
    static unicodeToBase64(str): string {
        return btoa(str);
    }

    static clone(object: any) {
        return JSON.parse(JSON.stringify(object));
    }

    // ---------------------------------------------------------------------------------------
    // TODO add type info and comments to signatures below, consider to move to separate class

    static resolve(path, obj) {
        if (path.length === 0) {
            return obj;
        }
        return path
            ? path.split('.')
                .reduce((prev, curr) => {
                    return prev ? prev[this.desanitizeKey(curr)] : null;
                }, obj || this)  // TODO what's '|| this' for?
            : null;
    }

    static getEmptyObject(config) {
        if (config.type === 'localizedtext') {
            return {};
        } else if (config.type === 'checkbox') {
            return false;
        } else if (config.type === 'catalogitems') {
            return [];
        } else {
            return '';
        }
    }

    static getFieldName(path) {
        let pathArray = path.split('.');
        return Utils.desanitizeKey(path.split('.')[pathArray.length - 1]);
    }

    static setNested(object: any, path: string, value: any) {
        if (path.length === 0) {
            object = value;
        }
        let arrayPath = path.split('.');
        let tmp = object;
        let field = Utils.getFieldName(path);
        arrayPath.splice(arrayPath.length - 1);
        arrayPath.forEach(x => {
            x = Utils.desanitizeKey(x);
            if (tmp[x] === undefined || tmp[x] === null) {
                tmp[x] = {};
            }
            tmp = tmp[x];
        });

        tmp[field] = value;
    }

    /*
        TODO - remove because unused
    */
    static createNested(path, obj) {
        let newObject = {};
        let start = newObject;
        let pathSplitArray = path.split('.');
        let i = 0;

        if (path.length === 0) {
            return obj;
        } else if (pathSplitArray.length === 1) {
            newObject[path] = obj;
            return newObject;
        } else {
            let keys = path.split('.');
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

    static mergeChanges(change1, change2) {
        for (let prop in change2) {
            change1[prop] = change2[prop];
        }
    }

    public static createObjectFromType(type: any, data: any): any {
        return Object.assign(new type(), data);
    }

    public static getStatus() {
        return [{ value: 0, label: 'Čeká na platbu' }, { value: 1, label: 'Připravena' }, { value: 3, label: 'Odeslána' }, { value: 4, label: 'Doručena' }];
    }
}
