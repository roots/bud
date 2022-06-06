/**
 * Jest configuration
 */
export default async function config() {
  return {
    coverageDirectory: 'storage/coverage',
    collectCoverageFrom: [
      'sources/@roots/**/src/**/*.{ts,tsx}',
      '!sources/@roots/**/src/**/*.dependencies.{ts,tsx}',
      '!sources/@roots/bud/src/cli/**/*.{ts,tsx}',
      '!sources/@roots/**/*.d.ts',
      '!storage/',
      '!node_modules/',
    ],
    coveragePathIgnorePatterns: [
      'sources/@roots/bud-dashboard/',
      'sources/@roots/dependencies/',
      'sources/@roots/filesystem/',
    ],
    preset: 'ts-jest/presets/default-esm',
    extensionsToTreatAsEsm: ['.ts'],
    globals: {
      'ts-jest': {
        useESM: true,
      },
    },
    moduleDirectories: ['node_modules'],
    moduleNameMapper: {
      '^(\\.{1,2}/.*)\\.js$': '$1',
      '#ansi-styles':
        '<rootDir>/node_modules/chalk/source/vendor/ansi-styles/index.js',
      '#supports-color':
        '<rootDir>/node_modules/chalk/source/vendor/supports-color/index.js',
    },
    modulePathIgnorePatterns: ['<rootDir>/.yarn', '<rootDir>/storage'],
    rootDir: '../',
    testEnvironment: 'node',
    testMatch: [`<rootDir>/tests/**/*.test.ts`],
    testPathIgnorePatterns: [
      '<rootDir>/build/',
      '<rootDir>/node_modules/',
      '<rootDir>/tests/__mocks__',
      '<rootDir>/cache/verdaccio',
    ],
    testTimeout: 60000,
    slowTestThreshold: 30000,
  }
}
