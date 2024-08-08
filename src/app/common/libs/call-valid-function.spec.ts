import callValidFunction from './call-valid-function';
import {isValidFunction} from '../validators/common-validators';

// Mock the isValidFunction
jest.mock('../validators/common-validators', () => ({
    isValidFunction: jest.fn(),
}));

describe('callValidFunction', () => {
    beforeEach(() => {
        // Clear all instances and calls to constructor and all methods:
        jest.clearAllMocks();
    });

    it('should return undefined if func is not a valid function', () => {
        (isValidFunction as jest.Mock).mockReturnValue(false);

        const result = callValidFunction(() => {}, 'param1', 'param2');

        expect(isValidFunction).toHaveBeenCalledWith(expect.any(Function));
        expect(result).toBeUndefined();
    });

    it('should call func with the provided params if func is a valid function', () => {
        const mockFunc = jest.fn().mockReturnValue('result');
        (isValidFunction as jest.Mock).mockReturnValue(true);

        const result = callValidFunction(mockFunc, 'param1', 'param2');

        expect(isValidFunction).toHaveBeenCalledWith(mockFunc);
        expect(mockFunc).toHaveBeenCalledWith('param1', 'param2');
        expect(result).toBe('result');
    });

    it('should return the result of the func call', () => {
        const mockFunc = jest.fn().mockReturnValue('result');
        (isValidFunction as jest.Mock).mockReturnValue(true);

        const result = callValidFunction(mockFunc);

        expect(result).toBe('result');
    });

    it('should handle no parameters being passed to func', () => {
        const mockFunc = jest.fn().mockReturnValue('result');
        (isValidFunction as jest.Mock).mockReturnValue(true);

        const result = callValidFunction(mockFunc);

        expect(mockFunc).toHaveBeenCalledWith();
        expect(result).toBe('result');
    });

    it('should handle a non-function parameter gracefully', () => {
        (isValidFunction as jest.Mock).mockReturnValue(false);

        const result = callValidFunction('not a function');

        expect(isValidFunction).toHaveBeenCalledWith('not a function');
        expect(result).toBeUndefined();
    });
});
