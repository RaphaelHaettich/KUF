import {setupServer} from 'msw/node';

// Todo: Insert mock api calls here.
export const handlers = [];

export const server = setupServer(...handlers);
