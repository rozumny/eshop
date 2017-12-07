import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/debounce';

import { Form } from '../models/form';
import { Control } from '../models/control';
import { FormDefinition } from '../models/form-definition';
import { Utils } from './utils-service';

@Injectable()
export class FormsService {

    constructor(
        private formBuilder: FormBuilder,
    ) {
    }

    public getNewFormModel(formDef: FormDefinition, watchForm: boolean, data: any = {}): Promise<Form> {
        return new Promise<Form>((resolve, reject) => {
            const form = new Form();
            form.watchForm = watchForm;
            form.config = formDef;
            let fields = {};

            formDef.fields.forEach(field => {
                let validators = [];

                if (field.required === true) {
                    validators.push(Validators.required);
                }

                fields[field.name + (field.lang ? field.lang : '')] = ['', Validators.compose(validators)];
            });

            form.authForm = this.formBuilder.group(fields);

            formDef.fields.forEach(field => {
                let control = new Control();
                control.abstractControl = form.authForm.controls[field.name + (field.lang ? field.lang : '')];
                control.config = field;
                form.controls.push(control);
            });

            // form.configKey = 'TODOconfigKey';
            form.watchForm = watchForm;

            this.loadNewFormData(form, data).then(() => {
                setTimeout(() => { // first render controls with new data
                    form.authForm.valueChanges
                        .debounce(function (x) {
                            return Observable.timer(500);
                        })
                        .subscribe((value: string) => {
                            if (form.authForm.valid && watchForm) {
                                form.formSavedEmmitter.emit(form.data);
                            }
                            if (watchForm) {
                                form.formChangedEmmitter.emit(form.data);
                            }
                        });
                }, 1000);
                resolve(form);
            });
        });
    }

    private loadNewFormData(form: Form, data: any): Promise<Form> {
        return new Promise<Form>((resolve, reject) => {
            if (data === undefined || data === null) {
                data = {};
            }
            form.data = data;
            form.controls.forEach((control: Control) => {
                this.setControlData(control, form);
            });
            resolve(form);
        });
    }

    private setControlData(control: Control, form: Form) {
        if (Utils.resolve(control.config.name, form.data) === undefined || Utils.resolve(control.config.name, form.data) === null) {
            Utils.setNested(form.data, control.config.name, Utils.getEmptyObject(control.config));
        }

        let pathArray = control.config.name.split('.');
        pathArray.splice(pathArray.length - 1, 1);
        let path = pathArray.join('.');
        control.dataObject = Utils.resolve(path, form.data);
        control.dataField = Utils.getFieldName(control.config.name);
        control.abstractControl.setValue(control.dataObject[control.dataField]);
    }
}
