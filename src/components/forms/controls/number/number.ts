import { Component, Input } from '@angular/core';
import { Events } from 'ionic-angular';

import { Control } from '../../../../models/control';
import { Form } from '../../../../models/form';

@Component({
    selector: 'number',
    templateUrl: 'number.html'
})
export class Number {
    @Input() control: Control;
    @Input() form: Form;

    constructor(
        private events: Events
    ) {
    }

    focusOutFunction() {
        if (this.control.config.focusout) {
            this.events.publish(this.control.config.focusout, this.control.dataObject[this.control.dataField]);
        }
    }

    onChange() {
        if (this.control.config.onchange) {
            this.events.publish(this.control.config.onchange, {
                id: this.control.config.name,
                value: this.control.dataObject[this.control.dataField]
            });
        }
    }
}
