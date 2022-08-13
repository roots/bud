import {paths} from '@repo/constants'

/**
 * Base jest configuration
 */
const base = {
  coverageProvider: 'v8',
  collectCoverageFrom: ['sources/**/*{ts,tsx}'],
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
  slowTestThreshold: 6 * 60 * 1000,
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    '<rootDir>/build/',
    '<rootDir>/node_modules/',
    '<rootDir>/tests/__mocks__',
    '<rootDir>/storage/',
  ],
  testTimeout: 6 * 60 * 1000,
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
  verbose: true,
}

/**
 * Jest configuration
 */
export default async () => ({
  ...base,
  projects: [
    {
      ...base,
      displayName: 'e2e',
      reporters: ['default'],
      testMatch: ['**/tests/e2e/**/*.test.ts'],
    },
    {
      ...base,
      displayName: 'integration',
      reporters: ['default'],
      testMatch: ['**/tests/integration/**/*.test.ts'],
    },
    {
      ...base,
      displayName: 'unit',
      collectCoverage: true,
      coveragePathIgnorePatterns: [
        '/node_modules/',
        '/vendor/',
        '/lib/',
        '/@repo/',
        '/tests/',
        '/__mocks__/',
        'spec.ts$',
        '.js$',
        '/deprecated/',
      ],
      reporters: ['default', 'github-actions'],
      testMatch: [
        '**/sources/@roots/*/src/**/*.test.ts',
        '**/tests/unit/**/*.test.ts',
      ],
    },
  ],
})
