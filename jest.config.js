const mapModuleNames = require('./dev/jest/util/moduleNameMapper')

/**
 * Jest configuration
 */
module.exports = async function config() {
  const moduleNameMapper = await mapModuleNames()

  return {
    collectCoverageFrom: [
      'packages/@roots/**/*.{ts,tsx}',
      '!packages/@roots/**/*.d.ts',
      '!packages/@roots/bud-support/**/*',
      '!packages/@roots/filesystem/**/*',
    ],
    coverageReporters: ['lcov', 'text', 'text-summary'],
    displayName: {
      name: 'bud',
      color: 'blue',
    },
    extensionsToTreatAsEsm: ['.ts', '.tsx'],
    globals: {
      'ts-jest': {
        tsconfig: '<rootDir>/dev/jest/tsconfig.jest.json',
        compiler: 'typescript',
      },
    },
    globalSetup: '<rootDir>/dev/jest/util/setup.global.js',
    moduleNameMapper,
    name: 'bud',
    preset: 'ts-jest',
    rootDir: process.cwd(),
    testEnvironment: 'node',
    testMatch: [
      `<rootDir>/tests/unit/**/*.ts`,
      `<rootDir>/tests/integration/**/*.ts`,
      `!**/__mocks__/**/*`,
    ],
    testPathIgnorePatterns: [
      '/node_modules/',
      '/tests/util/',
      '/tests/.*?/__mocks__/',
    ],
    verbose: true,
  }
}
