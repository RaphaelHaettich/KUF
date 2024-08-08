import formatDate from './format-date-time';

describe('formatDate', () => {
    it('should return an empty string if the input is empty', () => {
        expect(formatDate(undefined)).toBe('');
    });

    it('should format the date correctly for the default language', () => {
        const unixTimeStampString = 1625097600000;
        const formattedDate = formatDate(unixTimeStampString);
        expect(formattedDate).toBe('01.07.2021, 02:00');
    });
});
