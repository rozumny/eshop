import { Component, Input } from '@angular/core';
import { Control } from '../../../../models/control';
import { Form } from '../../../../models/form';
import { FormService } from '../../../../services/form-service';
import { Utils } from '../../../../services/utils-service';
import { Events } from 'ionic-angular';

@Component({
    selector: 'multiselectcontrol',
    templateUrl: 'multiselectcontrol.html'
})
export class MultiSelectControl {
    @Input() control: Control;
    @Input() form: Form;
    @Input() isMultiple: boolean = false;
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
    }

    onChange(value) {
        this.form.formSavedEmmitter.emit(this.form.data);
        if (this.control.config.onchange) {
            this.events.publish(this.control.config.onchange, { id: this.control.config.name, value: value });
        }
    }
}
