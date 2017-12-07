import { Injectable, Pipe } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'

@Pipe({
    name: 'safeHtml'
})
@Injectable()
export class SafeHtmlPipe {

    constructor(private sanitizer: DomSanitizer) { }

    public transform(value, args) {
        return this.sanitizer.bypassSecurityTrustHtml(value);
    }

}
