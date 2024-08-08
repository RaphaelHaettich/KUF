import {DateFormatPipe} from './date-format.pipe';
import {TranslationService} from '../services/translation-service/translation.service';
import formatDate from '../libs/format-date';

jest.mock('../libs/format-date');

describe('DateFormatPipe', () => {
    let pipe: DateFormatPipe;
    let translationServiceMock: Partial<TranslationService>;

    beforeEach(() => {
        translationServiceMock = {
            currentLang: 'en',
        };

        pipe = new DateFormatPipe(translationServiceMock as TranslationService);
    });

    it('should format the date based on the current language', () => {
        const unixTimeStamp = 1627847261;
        const formattedDate = 'August 1, 2021';
        (formatDate as jest.Mock).mockReturnValue(formattedDate);

        const result = pipe.transform(unixTimeStamp);

        expect(result).toBe(formattedDate);
        expect(formatDate).toHaveBeenCalledWith(unixTimeStamp, 'en');
    });

    it('should handle undefined timestamp gracefully', () => {
        const formattedDate = '';
        (formatDate as jest.Mock).mockReturnValue(formattedDate);

        const result = pipe.transform(undefined);

        expect(result).toBe(formattedDate);
        expect(formatDate).toHaveBeenCalledWith(undefined, 'en');
    });

    it('should update format when language changes', () => {
        const unixTimeStamp = 1627847261;
        const formattedDateEn = 'August 1, 2021';
        const formattedDateEs = '1 de agosto de 2021';

        // Initial call with English language
        (formatDate as jest.Mock).mockReturnValueOnce(formattedDateEn);
        let result = pipe.transform(unixTimeStamp);
        expect(result).toBe(formattedDateEn);
        expect(formatDate).toHaveBeenCalledWith(unixTimeStamp, 'en');

        // Change language to Spanish and call again
        (translationServiceMock as TranslationService).currentLang = 'es';
        (formatDate as jest.Mock).mockReturnValueOnce(formattedDateEs);
        result = pipe.transform(unixTimeStamp);
        expect(result).toBe(formattedDateEs);
        expect(formatDate).toHaveBeenCalledWith(unixTimeStamp, 'es');
    });
});
