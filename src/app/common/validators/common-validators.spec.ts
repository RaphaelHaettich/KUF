import {
    isJsonString,
    isNonEmptyArray,
    isNonEmptyObject,
    isNonEmptyString,
    isValidFunction,
} from './common-validators';

describe('common/libs/validators', () => {
    describe('isNonEmptyObject', () => {
        it('should be truthy', () => {
            expect(
                isNonEmptyObject({
                    a: 1,
                }),
            ).toBeTruthy();
            expect(isNonEmptyObject([1])).toBeTruthy();
        });
        it('should be falsy', () => {
            expect(isNonEmptyObject({})).toBeFalsy();
            expect(isNonEmptyObject([])).toBeFalsy();
        });
    });

    describe('isNonEmptyArray', () => {
        it('should return true with non empty array', () => {
            expect(isNonEmptyArray([1, 2, 3])).toBe(true);
        });
        it('should return false with empty array', () => {
            expect(isNonEmptyArray([])).toBe(false);
        });
        it('should return false with something that is not an array', () => {
            expect(isNonEmptyArray('string')).toBe(false);
        });
    });

    describe('isJsonString', () => {
        it('should return true for valid JSON string', () => {
            const validJson = '{"name": "John", "age": 30}';
            expect(isJsonString(validJson)).toBe(true);
        });

        it('should return false for invalid JSON string', () => {
            const invalidJson = '{name: "John", age: 30}';
            expect(isJsonString(invalidJson)).toBe(false);
        });

        it('should return false for null', () => {
            expect(isJsonString(null)).toBe(false);
        });

        it('should return false for non-string values', () => {
            // @ts-expect-error => Testing non-string values
            expect(isJsonString(123)).toBe(false);
            // @ts-expect-error => Testing non-string values
            expect(isJsonString(true)).toBe(false);
            // @ts-expect-error => Testing non-string values
            expect(isJsonString({})).toBe(false);
            // @ts-expect-error => Testing non-string values
            expect(isJsonString([])).toBe(false);
        });
    });

    describe('isNonEmptyString', () => {
        it('should return true with non empty string', () => {
            expect(isNonEmptyString('nonEmptyString')).toBe(true);
        });
        it('should return false with empty string', () => {
            expect(isNonEmptyString('')).toBe(false);
        });
        it('should return false with something that is not a string', () => {
            expect(isNonEmptyString([])).toBe(false);
        });
    });

    describe('isValidFunction', () => {
        it('should return true with valid function', () => {
            expect(isValidFunction(() => {})).toBe(true);
        });

        it('should return false with something not a function', () => {
            expect(isValidFunction('')).toBe(false);
        });
    });
});
