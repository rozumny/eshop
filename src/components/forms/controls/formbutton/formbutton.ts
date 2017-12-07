import { Component, Input } from '@angular/core';
import { Events } from 'ionic-angular';

import { Control } from '../../../../models/control';
import { Form } from '../../../../models/form';

@Component({
    selector: 'formbutton',
    templateUrl: 'formbutton.html'
})
export class FormButton {
    @Input() control: Control;
    @Input() form: Form;

    constructor(
        private events: Events
    ) {
    }

    ngOnInit() {
        if (this.control.config.onhide) {
            this.events.subscribe(this.control.config.onhide, (hide) => {
                this.control.config.hide = hide;
            });
        }
    }

    onClick(e) {
        this.events.publish(this.control.config.onclick);
        e.preventDefault();
    }
}
