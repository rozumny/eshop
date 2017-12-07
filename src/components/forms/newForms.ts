import { Component, Input } from '@angular/core';
import { Form } from '../../models/form';

@Component({
    selector: 'newforms',
    templateUrl: 'newForms.html'
})
export class NewForms {
    @Input() form: Form;

    constructor() {
    }

    onSubmit(form: Form) {
        if (form.authForm.valid) {
            // alert('fadsfas');
        }
    }
}
