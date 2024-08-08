// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isNonEmptyObject = (input: any): boolean => {
    return Boolean(input) && typeof input === 'object' && Object.keys(input).length > 0;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isNonEmptyArray = (input: any): boolean => Array.isArray(input) && input.length > 0;

export const isJsonString = (strJson: string | null) => {
    try {
        if (strJson === null) return false;

        const parsed = JSON.parse(strJson);
        if (parsed && typeof parsed === 'object') {
            return true;
        }
    } catch {
        return false;
    }
    return false;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isNonEmptyString = (input: any): boolean =>
    typeof input === 'string' && input.length > 0;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isValidFunction = (func: any): boolean => typeof func === 'function';
