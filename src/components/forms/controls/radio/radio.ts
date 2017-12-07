import { Component, Input } from '@angular/core';
import { Events } from 'ionic-angular';

import { Control } from '../../../../models/control';
import { Form } from '../../../../models/form';
import { FormService } from '../../../../services/form-service';
import { Utils } from '../../../../services/utils-service';

@Component({
    selector: 'radio',
    templateUrl: 'radio.html'
})
export class RadioControl {
    @Input() control: Control;
    @Input() form: Form;
    options: any[];

    constructor(
        private formService: FormService,
        private events: Events
    ) {
    }

    ngOnInit() {
        if (this.control.config.populate) {
            this.options = this.formService.getFormSymbols()[this.control.config.populate]();
        } else if (this.control.config.populateData) {
            this.options = this.control.config.populateData;
        } else if (this.control.config.populateFromData) {
            let options = Utils.resolve(this.control.config.populateFromData, this.form.data);
            this.options = options.map(x => {
                return { label: x, value: x };
            });
        } else if (this.control.config.populateByPromise) {
            this.formService.getFormSymbols()[this.control.config.populateByPromise]().then(data => {
                this.options = data;
            });
        }

        if (this.control.config.setOptions) {
            this.events.subscribe(this.control.config.setOptions, (options) => this.setOptions(options));
        }
    }

    getChecked(item) {
        if (item.constructor === Object) {
            let a = JSON.stringify(item);
            let b = JSON.stringify(this.control.dataObject[this.control.dataField]);
            return a === b;
        } else {
            return this.control.dataObject[this.control.dataField] === item;
        }
    }

    setOptions(options) {
        this.options = options;
    }

    onChange(value) {
        if (!value) {
            return;
        }

        this.control.dataObject[this.control.dataField] = value;
        let change = {};
        change[this.control.dataField] = this.control.dataObject[this.control.dataField];
        this.form.formSavedEmmitter.emit(change);
        this.form.formChangedEmmitter.emit(change);
        if (this.control.config.onchange) {
            this.events.publish(this.control.config.onchange, { id: this.control.config.name, value: value });
        }
    }
}
