import 'zone.js';
import 'zone.js/testing';
import {ngMocks} from 'ng-mocks';
import {server} from './node';
import {TestBed} from '@angular/core/testing';
import {
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
ngMocks.autoSpy('jest');

beforeAll(() => {
    // Enable API mocking before all the tests.
    server.listen();
});

afterEach(() => {
    // Reset the request handlers between each test.
    // This way the handlers we add on a per-test basis
    // do not leak to other, irrelevant tests.
    server.resetHandlers();
});

afterAll(() => {
    // Finally, disable API mocking after the tests are done.
    server.close();
});
