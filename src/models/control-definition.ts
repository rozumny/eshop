export class ControlDefinition {
    public id: string;
    public type: string;
    public subtype: string;
    public label: string;
    public group: string;
    public translatedLabel: string;
    public name: string;
    public onchange: string;
    public setOptions: string;
    public hide: boolean;
    public onhide: string;
    public hideLabel: boolean;
    public populate: string;
    public populateData: any;
    public populateFromData: any;
    public required: boolean;
    public lang: string;
    public min: number;
    public max: number;
    public isHeader: boolean = false;
    public isHint: boolean = false;
    public h1: boolean = false;
    public color: string;
    public onclick: string;
    public class: string;
    public linebreak: boolean = false;
    public setFocus: boolean = false;
    public resetValue: string;
    public description: string;
    public translatedDescription: string;
    public listConfig: any;
    public labels: string[];
    public items: any[];

    constructor() {
    }
}
