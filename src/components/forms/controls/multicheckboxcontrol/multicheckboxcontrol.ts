import { Component, Input } from '@angular/core';
import { Control } from '../../../../models/control';
import { Form } from '../../../../models/form';
import { FormService } from '../../../../services/form-service';
import { Utils } from '../../../../services/utils-service';
import { Events } from 'ionic-angular';

@Component({
    selector: 'multicheckboxcontrol',
    templateUrl: 'multicheckboxcontrol.html'
})
export class MultiCheckboxControl {
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
            this.control.config.hide = !(this.options && this.options.length > 0);
        } else if (this.control.config.populateData) {
            this.options = this.control.config.populateData;
            this.control.config.hide = !(this.options && this.options.length > 0);
        } else if (this.control.config.populateFromData) {
            let options = Utils.resolve(this.control.config.populateFromData, this.form.data);
            this.options = options.map(x => {
                return { label: x, value: x };
            });
            this.control.config.hide = !(this.options && this.options.length > 0);
        } else if (this.control.config.populateByPromise) {
            this.formService.getFormSymbols()[this.control.config.populateByPromise]().then(data => {
                this.options = data;
                this.control.config.hide = !(this.options && this.options.length > 0);
            });
        }

        if (this.control.config.resetValue) {
            this.events.subscribe(this.control.config.resetValue, (item) => this.resetSelection(item));
        }

        if (this.control.config.setOptions) {
            this.events.subscribe(this.control.config.setOptions, (options) => this.setOptions(options));
        }
    }

    setOptions(options) {
        this.options = options;
    }

    resetSelection(value: any) {
        if (value instanceof Array) {
            this.control.dataObject[this.control.dataField] = [];
        } else {
            this.onChange(value);
        }
    }

    getChecked(value) {
        return this.control.dataObject[this.control.dataField] &&
            this.control.dataObject[this.control.dataField].length > 0 ? !!this.control.dataObject[this.control.dataField].find(x => x === value) : false;
    }

    onChange(value) {
        if (!this.control.dataObject[this.control.dataField]) {
            this.control.dataObject[this.control.dataField] = [];
        }
        if (this.control.dataObject[this.control.dataField].constructor !== Array) {
            this.control.dataObject[this.control.dataField] = [];
        }
        if (this.control.dataObject[this.control.dataField].find(x => x === value)) {
            let i = this.control.dataObject[this.control.dataField].indexOf(value);
            this.control.dataObject[this.control.dataField].splice(i, 1);
        } else {
            this.control.dataObject[this.control.dataField].push(value);
        }

        let change = {};
        change[this.control.dataField] = this.control.dataObject[this.control.dataField];
        this.form.formSavedEmmitter.emit(change);
        this.form.formChangedEmmitter.emit(change);
        if (this.control.config.onchange) {
            this.events.publish(this.control.config.onchange, { id: this.control.config.name, value: value });
        }
    }

    isSelected(value) {
        if (!this.control.dataObject[this.control.dataField]) {
            return false;
        }
        if (this.control.dataObject[this.control.dataField].constructor !== Array) {
            return false;
        }

        return this.control.dataObject[this.control.dataField].find(x => x === value);
    }
}
