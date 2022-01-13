const {resolve} = require('path')
const mapModuleNames = require('../dev/jest/moduleNameMapper')

/**
 * Jest configuration
 */
module.exports = async function config() {
  const moduleNameMapper = await mapModuleNames()

  return {
    collectCoverageFrom: [
      'sources/@roots/**/src/**/*.{ts,tsx}',
      '!sources/@roots/**/src/**/*.dependencies.{ts,tsx}',
      '!sources/@roots/bud/src/cli/**/*.{ts,tsx}',
      '!sources/@roots/**/*.d.ts',
    ],
    coveragePathIgnorePatterns: [
      'node_modules',
      'sources/@roots/bud-dashboard/',
      'sources/@roots/bud-support/',
      'sources/@roots/filesystem/',
      'sources/@roots/ink-prettier/',
      'sources/@roots/ink-use-style/',
    ],
    coverageReporters: ['lcov', 'text', 'text-summary'],
    displayName: {
      name: 'bud',
      color: 'blue',
    },
    extensionsToTreatAsEsm: ['.ts', '.tsx'],
    globals: {
      'ts-jest': {
        tsconfig: '<rootDir>/config/tsconfig.jest.json',
        compiler: 'typescript',
      },
    },
    moduleNameMapper,
    modulePathIgnorePatterns: [
      `<rootDir>/.container/`,
      `<rootDir>/node_modules/`,
    ],
    name: 'bud',
    preset: 'ts-jest',
    rootDir: resolve(__dirname, '../'),
    testEnvironment: 'node',
    testMatch: [
      `<rootDir>/tests/unit/**/*.test.ts`,
      `<rootDir>/tests/integration/babel.test.ts`,
    ],
    testPathIgnorePatterns: [
      '<rootDir>/build/',
      '<rootDir>/node_modules/',
      '<rootDir>/tests/__mocks__',
    ],
  }
}
