const {mapModuleNames} = require('./dev/jest/moduleNameMapper')

/**
 * Integration test configuration
 *
 * @remarks
 * Run the tests with the following command:
 * $ yarn kjo test --integration
 */
module.exports = async function config() {
  const moduleNameMapper = await mapModuleNames()

  return {
    name: 'integration',
    displayName: {
      name: 'integration',
      color: 'blue',
    },
    extensionsToTreatAsEsm: ['.ts', '.tsx'],
    preset: 'ts-jest',
    globalSetup: '<rootDir>/dev/jest/jest.setup.js',
    globalTeardown: '<rootDir>/dev/jest/jest.teardown.js',
    testEnvironment: 'node',
    collectCoverageFrom: [
      'packages/@roots/**/lib/cjs/**/*',
      '!packages/@roots/bud-support/**/*',
      '!packages/@roots/filesystem/**/*',
    ],
    coverageReporters: ['lcov', 'text', 'html'],
    globals: {
      'ts-jest': {
        tsconfig: './tsconfig.jest.json',
        compiler: 'typescript',
      },
    },
    moduleNameMapper,
    testMatch: [`<rootDir>/tests/integration/**/*.ts`],
    testPathIgnorePatterns: [
      '/node_modules/',
      '/examples/',
      '/docs/',
      '/dev/',
      '/site/',
      '/tests/util/',
    ],
    verbose: true,
  }
}
