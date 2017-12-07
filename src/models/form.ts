import { Control } from './control';
import { EventEmitter } from '@angular/core';

export class Form {
    public authForm: any;
    public config: any;
    public controls: Control[];
    public setObject: any; // ??
    public data: any;
    public configKey: string;
    public subIndex: string;
    public controller: any;
    public watchForm: boolean;
    public formSavedEmmitter: any;
    public formChangedEmmitter: any;

    constructor() {
        this.controls = [];
        this.formSavedEmmitter = new EventEmitter();
        this.formChangedEmmitter = new EventEmitter();
    }
}
