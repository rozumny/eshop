import { Component, Input } from '@angular/core';
import { Events } from 'ionic-angular';
import { Control } from '../../../../models/control';
import { Form } from '../../../../models/form';

@Component({
    selector: 'localizedtext',
    templateUrl: 'localizedtext.html'
})
export class LocalizedText {
    @Input() control: Control;
    @Input() form: Form;
    hide: boolean;

    constructor(private events: Events) {
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

    onChange(value) {
        if (this.control.config.onchange) {
            this.events.publish(this.control.config.onchange, { id: this.control.config.name, value: value });
        }
    }
}
