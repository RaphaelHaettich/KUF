export default (unixTimeStampString: number | undefined, currentLang = 'de'): string => {
    if (!unixTimeStampString) {
        return '';
    }

    const date = new Date(unixTimeStampString);
    return date.toLocaleTimeString(`${currentLang}-CH`, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    });
};
