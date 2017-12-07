import { Component, Input } from '@angular/core';

import { Control } from '../../../../models/control';
import { Form } from '../../../../models/form';

@Component({
    selector: 'linebreak',
    templateUrl: 'linebreak.html'
})
export class Linebreak {
    @Input() control: Control;
    @Input() form: Form;

    constructor() {
    }
}
