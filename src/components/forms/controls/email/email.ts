import { Component, Input } from '@angular/core';
import { Events } from 'ionic-angular';
import { TranslateService } from 'ng2-translate';
import { Control } from '../../../../models/control';
import { Form } from '../../../../models/form';

@Component({
    selector: 'email',
    templateUrl: 'email.html'
})
export class Email {
    @Input() control: Control;
    @Input() form: Form;
    public show: boolean = true;

    constructor(
        private events: Events,
        private translate: TranslateService
    ) {
    }

    ngOnInit() {
        if (this.control.config.hide)
            this.show = false;

        if (this.control.config.onshow) {
            this.events.subscribe(this.control.config.onshow, () => {
                this.show = true;
            });
        }
        if (this.control.config.onhide) {
            this.events.subscribe(this.control.config.onhide, () => {
                this.show = false;
            });
        }
    }
}
