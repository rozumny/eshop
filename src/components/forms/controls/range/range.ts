import { Component, Input } from '@angular/core';
import { Events } from 'ionic-angular';

import { Control } from '../../../../models/control';
import { Form } from '../../../../models/form';

@Component({
    selector: 'range',
    templateUrl: 'range.html'
})
export class Range {
    @Input() control: Control;
    @Input() form: Form;
    public hide: boolean = false;

    constructor(
        private events: Events
    ) {
    }

    onChange() {
        if (this.control.config.onchange) {
            this.events.publish(this.control.config.onchange, {
                id: this.control.config.name,
                value: this.control.dataObject[this.control.dataField]
            });
        }
    }

    ngOnInit() {
        if (this.control.dataObject[this.control.dataField].constructor !== Object) {
            this.control.dataObject[this.control.dataField] = { lower: 0, upper: 0 };
        }

        if (this.control.config.hide !== undefined) {
            this.hide = this.control.config.hide;
        }

        if (this.control.config.onhide) {
            this.events.subscribe(this.control.config.onhide, () => {
                this.control.config.hide = !this.hide;
            });
        }
    }

    ngOnDestroy() {
        this.events.unsubscribe(this.control.config.onhide, null);
    }
}
