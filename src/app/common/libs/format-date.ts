import {DATE_FORMATS_NATIVE} from '../../../configs/date.config';

export default (unixTimeStampString: number | undefined, currentLang = 'de'): string => {
    if (!unixTimeStampString) {
        return '';
    }

    const date = new Date(unixTimeStampString);
    return date.toLocaleDateString(`${currentLang}-CH`, DATE_FORMATS_NATIVE.display.dateInput);
};
