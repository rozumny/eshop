import { Injectable } from '@angular/core';

@Injectable()
export class StyleService {

  constructor(
  ) {
  }

  public apply(style: any): void {
    let styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    styleElement.innerHTML =
      '.toolbar-background { background-color: ' + style.headerBackgroundColor + ' !important } \
                ion-toolbar.modal { background-color: '+ style.headerBackgroundModalsColor + ' } \
                .button:not([color]), .button:not([color]):hover  { color: '+ style.primaryColor + '; background-color: #EBEBEC} \
                .button[color="primary"], .button[color="primary"]:hover { background-color: '+ style.primaryColor + '} \
                .fab, .toggle-md.toggle-checked .toggle-inner { background-color: '+ style.primaryColor + '} \
                .toggle-checked .toggle-icon { background-color: ' + this.hexToRgb(style.primaryColor) + ' !important; } \
                a, .button-clear { color: '+ style.primaryColor + '} \
                .filedrag { border: 2px dashed ' + style.primaryColor + '; } \
                .segment-button.segment-activated { border-color: '+ style.primaryColor + '!important } \
                .tab-button[aria-selected=true] .tab-button-icon { color: '+ style.primaryColor + '!important } \
                .tab-button[aria-selected=true] { color: '+ style.primaryColor + '!important } \
                .checkbox-checked { border-color: '+ style.primaryColor + '!important; background-color: ' + style.primaryColor + '!important } \
                .radio-checked { border-color: '+ style.primaryColor + '!important } \
                .item-radio-checked.item ion-label { color: '+ style.primaryColor + '!important } \
                .radio-inner { background-color: '+ style.primaryColor + '!important} \
                ion-spinner * { stroke: ' + style.primaryColor + ' !important; } \
                ion-item.input-has-focus.label { color: '+ style.primaryColor + '!important } \
                ion-item.input-has-focus { border-bottom-color: '+ style.primaryColor + '!important } \
                .item.item-input.input-has-focus .item-inner {border-bottom-color: '+ style.primaryColor + '!important; box-shadow: inset 0 -1px 0 0 ' + style.primaryColor + ' !important; } \
                .input-has-focus .label[stacked], .input-has-focus .label[floating] { color: ' + style.primaryColor + '; } \
                .swiper-pagination-bullet-active { background: '+ style.primaryColor + '} \
                .alert-radio-inner { background-color: ' + style.primaryColor + ' !important} \
                button.alert-tappable[aria-checked=true] .alert-radio-icon { border-color: '+ style.primaryColor + ' !important} \
                button.alert-tappable[aria-checked=true] .alert-radio-inner { border-color: '+ style.primaryColor + ' !important; background-color: ' + style.primaryColor + ' !important} \
                button.alert-tappable[aria-checked=true] .alert-radio-label { color: '+ style.primaryColor + ' !important} \
                button.alert-button .button-inner {color: '+ style.primaryColor + ' !important}';
    document.getElementsByTagName('head')[0].appendChild(styleElement);
  }

  private hexToRgb(hex: string): string {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    let a = result
      ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
      : null;
    let rgb = 'rgba(' + a.r + ', ' + a.g + ', ' + a.b + ', 0.5)';
    return rgb;
  }

}
