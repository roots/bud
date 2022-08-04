import {paths} from '@repo/constants'

const base = {
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  moduleDirectories: ['node_modules'],
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
  reporters: ['default', 'github-actions'],
  rootDir: paths.root,
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    '<rootDir>/build/',
    '<rootDir>/node_modules/',
    '<rootDir>/tests/__mocks__',
    '<rootDir>/cache/verdaccio',
  ],
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

/**
 * Jest configuration
 */
export default async function config() {
  return {
    projects: [
      {
        displayName: 'e2e',
        ...base,
        testMatch: ['<rootDir>/tests/e2e/**/*.test.ts'],
        testTimeout: 60000,
        slowTestThreshold: 60000,
      },
      {
        displayName: 'integration',
        ...base,
        testMatch: ['<rootDir>/tests/integration/**/*.test.ts'],
        testTimeout: 120000,
        slowTestThreshold: 120000,
      },
      {
        ...base,
        displayName: 'unit',
        collectCoverage: true,
        collectCoverageFrom: ['sources/**/*{ts,tsx}'],
        coveragePathIgnorePatterns: [
          '/node_modules/',
          '/vendor/',
          '/lib/',
          '/@repo/',
          '/tests/',
        ],
        coverageProvider: 'v8',
        extensionsToTreatAsEsm: ['.ts', '.tsx'],
        testMatch: [
          '**/sources/@roots/*/src/**/*.test.ts',
          '**/tests/unit/**/*.test.ts',
        ],
        verbose: true,
      },
    ],
  }
}
