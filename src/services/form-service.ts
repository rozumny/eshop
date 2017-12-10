import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class FormService {

    constructor(
        private translate: TranslateService
    ) {
    }

    getFormDependencies() {
        return {
            symbols: this.getFormSymbols()
        };
    };

    getFormSymbols() {
        return {
            getMainWindowStartPosition: () => {
                return [{ value: 'middle', label: 'Middle' }, { value: 'left', label: 'Left' }, { value: 'right', label: 'Right' }];
            },
            getDateOptions: () => {
                return [{ value: 'day', label: this.translate.instant('toolbar_filter_day') }, { value: 'week', label: this.translate.instant('toolbar_filter_week') }, { value: 'month', label: this.translate.instant('toolbar_filter_month') }];
            }
        };
    };
}
