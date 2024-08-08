import {Pipe, PipeTransform} from '@angular/core';
import {TranslationService} from '../services/translation-service/translation.service';
import formatDate from '../libs/format-date';

@Pipe({
    name: 'dateFormatPipe',
    // This pipe is impure because it relies on the current language of the application
    // and the data does not change during the component lifecycle, but the current
    // relies on the selected language
    // eslint-disable-next-line @angular-eslint/no-pipe-impure
    pure: false,
})
export class DateFormatPipe implements PipeTransform {
    constructor(private readonly translationService: TranslationService) {}
    transform(unixTimeStampString: number | undefined) {
        return formatDate(unixTimeStampString, this.translationService.currentLang);
    }
}
