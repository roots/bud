const {resolve} = require('node:path')
const mapModuleNames = require('@repo/test-kit/moduleNameMapper')

/**
 * Jest configuration
 */
module.exports = async function config() {
  const moduleNameMapper = await mapModuleNames()

  return {
    coverageDirectory: 'storage/coverage',
    collectCoverageFrom: [
      'sources/@roots/**/src/**/*.{ts,tsx}',
      '!sources/@roots/**/src/**/*.dependencies.{ts,tsx}',
      '!sources/@roots/bud/src/cli/**/*.{ts,tsx}',
      '!sources/@roots/**/*.d.ts',
      '!storage/**/*',
      '!node_modules/**/*',
    ],
    coveragePathIgnorePatterns: [
      'sources/@roots/bud-framework/src/Build/',
      'sources/@roots/bud-framework/src/Extensions/',
      'sources/@roots/bud-framework/src/Peers/',
      'sources/@roots/bud-framework/src/Project/',
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
      `<rootDir>/node_modules/`,
      `<rootDir>/storage/`,
    ],
    name: 'bud',
    preset: 'ts-jest',
    rootDir: resolve(__dirname, '../'),
    testEnvironment: 'node',
    testMatch: [
      `<rootDir>/tests/unit/**/*.test.ts`,
      `<rootDir>/tests/integration/babel.test.ts`,
      `<rootDir>/tests/integration/sage.test.ts`,
      `<rootDir>/tests/integration/vue.test.ts`,
      `<rootDir>/tests/integration/sass.test.ts`,
    ],
    testPathIgnorePatterns: [
      '<rootDir>/build/',
      '<rootDir>/node_modules/',
      '<rootDir>/tests/__mocks__',
      '<rootDir>/cache/verdaccio',
    ],
  }
}
