module.exports = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/tests/setup-jest.ts'],
    globalSetup: 'jest-preset-angular/global-setup',
    testMatch: ['**/*.spec.ts'],
    testEnvironmentOptions: {
        customExportConditions: [''],
    },
    testEnvironment: "<rootDir>/tests/jest.environment.js",
    coveragePathIgnorePatterns: [
        'generated',
    ],
    globals: {
        fetch: global.fetch
    }
};
