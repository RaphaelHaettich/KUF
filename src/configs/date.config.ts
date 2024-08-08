import {MAT_NATIVE_DATE_FORMATS, MatDateFormats} from '@angular/material/core';

export const DATE_FORMATS_NATIVE: MatDateFormats = {
    ...MAT_NATIVE_DATE_FORMATS,
    display: {
        ...MAT_NATIVE_DATE_FORMATS.display,
        dateInput: {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
        } as Intl.DateTimeFormatOptions,
    },
};

export const DATE_FORMATS_MOMENT: MatDateFormats = {
    parse: {
        dateInput: 'DD.MM.YYYY',
    },
    display: {
        dateInput: 'DD.MM.YYYY',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};
