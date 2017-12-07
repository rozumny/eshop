import { Component, ViewChild, Input } from '@angular/core';
import { Events, TextInput } from 'ionic-angular';

import { Control } from '../../../../models/control';
import { Form } from '../../../../models/form';

@Component({
    selector: 'textareacontrol',
    templateUrl: 'textarea.html'
})
export class TextArea {
    @ViewChild('mytextarea') textareaInput: TextInput;
    @Input() control: Control;
    @Input() form: Form;

    constructor(
        private events: Events
    ) {
    }

    public ngAfterViewInit(): void {
        if (this.textareaInput) {
            //spinner break input focus, need to be called after form load is finished
            this.events.unsubscribe("setFocus");
            this.events.subscribe("setFocus", () => {
                this.setFocus();
            });

            const textArea = this.textareaInput._elementRef.nativeElement.children[0];
            textArea.value = this.control.dataObject[this.control.dataField];
            textArea.rows = this.getTextAreaRowsFor(this.control.dataObject[this.control.dataField]);
        }
    }

    public ngOnDestroy() {
        this.events.unsubscribe("setFocus");
    }

    private setFocus() {
        if (this.textareaInput && this.control.config.setFocus) {
            this.textareaInput.setFocus();
        }
    }

    public onChange(newValue: any): void {
        const textArea = this.textareaInput._elementRef.nativeElement.children[0];
        textArea.rows = this.getTextAreaRowsFor(textArea.value);
        this.control.dataObject[this.control.dataField] = textArea.value;
        this.control.abstractControl.setValue(this.control.dataObject[this.control.dataField]);

        if (this.control.config.onchange) {
            this.events.publish(this.control.config.onchange, {
                id: this.control.config.name,
                value: this.control.dataObject[this.control.dataField]
            });
        }
    }

    private getTextAreaRowsFor(text: string): number {
        let rows = (text || '').split('\n').length;
        return rows < 3 ? 3 : rows;
    }
}
