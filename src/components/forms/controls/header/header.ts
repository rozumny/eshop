import { Component, Input } from '@angular/core';
import { Events } from 'ionic-angular';

import { Control } from '../../../../models/control';
import { Form } from '../../../../models/form';

@Component({
    selector: 'header',
    templateUrl: 'header.html'
})
export class Header {
    @Input() control: Control;
    @Input() form: Form;

    constructor(
        private events: Events
    ) {
    }

    onChange() {
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
