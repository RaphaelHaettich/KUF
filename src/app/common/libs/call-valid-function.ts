import {isValidFunction} from '../validators/common-validators';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (func: any, ...params: any): any => {
    if (!isValidFunction(func)) {
        return undefined;
    }

    return func(...params);
};
