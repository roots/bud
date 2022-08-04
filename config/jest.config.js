import {paths} from '@repo/constants'

/**
 * Base jest configuration
 */
const base = {
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  moduleDirectories: ['node_modules'],
  moduleNameMapper: {
    /**
     * Jest doesn't understand .js extension with es modules
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
export default async () => ({
  projects: [
    {
      displayName: 'e2e',
      ...base,
      reporters: ['default'],
      testMatch: ['**/tests/e2e/**/*.test.ts'],
      testTimeout: 120000,
      slowTestThreshold: 120000,
    },
    {
      displayName: 'integration',
      ...base,
      reporters: ['default'],
      testMatch: ['**/tests/integration/**/*.test.ts'],
      testTimeout: 240000,
      slowTestThreshold: 240000,
    },
    {
      displayName: 'unit',
      ...base,
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
      reporters: ['default', 'github-actions'],
      testMatch: [
        '**/sources/@roots/*/src/**/*.test.ts',
        '**/tests/unit/**/*.test.ts',
      ],
      verbose: true,
    },
  ],
})
