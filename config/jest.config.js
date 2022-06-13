/**
 * Jest configuration
 */
export default async function config() {
  return {
    extensionsToTreatAsEsm: ['.ts', '.tsx'],
    moduleDirectories: ['node_modules'],
    /* @prettier-ignore */
    moduleNameMapper: {
      /**
       * Jest doesn't understand ts with es modules
       */
      '^(\\.{1,2}/.*)\\.js$': '$1',
      /**
       * Jest doesn't understand # in import maps
       */
      '#ansi-styles':
        '<rootDir>/node_modules/chalk/source/vendor/ansi-styles/index.js',
      '#supports-color':
        '<rootDir>/node_modules/chalk/source/vendor/supports-color/index.js',
    },
    modulePathIgnorePatterns: ['<rootDir>/.yarn', '<rootDir>/storage'],
    rootDir: '../',
    slowTestThreshold: 30000,
    testEnvironment: 'node',
    testMatch: [`<rootDir>/tests/**/*.test.ts`],
    testPathIgnorePatterns: [
      '<rootDir>/build/',
      '<rootDir>/node_modules/',
      '<rootDir>/tests/__mocks__',
      '<rootDir>/cache/verdaccio',
    ],
    testTimeout: 60000,
    transform: {
      '^.+\\.(c|m)?(t|j)sx?$': [
        '@swc/jest',
        {
          jsc: {
            parser: {
              syntax: 'typescript',
              jsx: true,
              dynamicImport: true,
              optionalChaining: true,
              decorators: true,
              importMeta: true,
            },
            target: 'es2021',
          },
          sourceMaps: true,
        },
      ],
    },
  }
}
