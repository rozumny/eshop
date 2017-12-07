import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Control } from '../../../../models/control';
import { Form } from '../../../../models/form';

@Component({
    selector: 'paragraph',
    templateUrl: 'paragraph.html'
})
export class Paragraph {
    @Input() control: Control;
    @Input() form: Form;
    public content: string;

    constructor(
        private translate: TranslateService
    ) {
    }

    ngOnInit() {
        if (!this.control.config.label) {
            this.content = this.control.dataObject[this.control.dataField];
        } else {
            this.content = this.translate.instant(this.control.config.label);
        }
    }
}
