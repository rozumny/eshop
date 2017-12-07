import { Component, Input } from '@angular/core';
import { Events } from 'ionic-angular';

import { Control } from '../../../../models/control';
import { Form } from '../../../../models/form';

@Component({
    selector: 'checkbox',
    templateUrl: 'checkbox.html'
})
export class Checkbox {
    @Input() control: Control;
    @Input() form: Form;
    data: boolean;
    public hide: boolean;

    constructor(
        private events: Events
    ) {
    }

    ngOnDestroy() {
        this.events.unsubscribe(this.control.config.onhide, null);
    }

    ngOnInit() {
        if (this.control.config.onhide) {
            this.events.subscribe(this.control.config.onhide, (e) => {
                this.control.config.hide = e[0];
            });
        }
    }

    onchange() {
        if (this.control.config.onchange) {
            this.events.publish(
                this.control.config.onchange,
                {
                    id: this.control.config.name,
                    value: this.control.dataObject[this.control.dataField]
                });
        }
    }
}
