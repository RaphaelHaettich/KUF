import formatDate from './format-date';

describe('formatDate', () => {
    it('should return an empty string if the input is empty', () => {
        expect(formatDate(undefined)).toBe('');
    });

    it('should format the date correctly', () => {
        const unixTimeStampString = 1625097600000;
        const formattedDate = formatDate(unixTimeStampString, 'de');
        expect(formattedDate).toMatchSnapshot();
    });

    it('should format the date correctly for a different language', () => {
        const unixTimeStampString = 1625097600000;
        const formattedDate = formatDate(unixTimeStampString, 'fr');
        expect(formattedDate).toMatchSnapshot();
    });
});
