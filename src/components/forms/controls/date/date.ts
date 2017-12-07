import { Component, Input } from '@angular/core';
import { Events } from 'ionic-angular';

import { Control } from '../../../../models/control';
import { Form } from '../../../../models/form';

@Component({
    selector: 'date',
    templateUrl: 'date.html'
})
export class DateControl {
    @Input() control: Control;
    @Input() form: Form;
    @Input() type: string;
    public formats: Object;

    constructor(
        private events: Events,
    ) {
        // this.formats = this.vmmapp.getDateFormats(this.userSettings.getVmLocale());
    }

    onChange() {
        this.control.dataObject[this.control.dataField] = new Date(this.control.dataObject[this.control.dataField]).toISOString()

        if (this.control.config.onchange) {
            this.events.publish(
                this.control.config.onchange,
                {
                    id: this.control.config.name,
                    value: this.control.dataObject[this.control.dataField]
                }
            );
        }
    }
}
