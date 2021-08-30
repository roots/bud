const {mapModuleNames} = require('./dev/jest/moduleNameMapper')

/**
 * Unit test configuration
 *
 * @remarks
 * Run the tests with the following command:
 * $ yarn kjo test --unit
 */
module.exports = async function config() {
  const moduleNameMapper = await mapModuleNames()

  return {
    name: 'unit',
    displayName: {
      name: 'unit',
      color: 'blue',
    },
    extensionsToTreatAsEsm: ['.ts', '.tsx'],
    preset: 'ts-jest',
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
    testMatch: [
      `<rootDir>/packages/@roots/*/src/__tests__/**/*.ts`,
      `<rootDir>/tests/unit/**/*.ts`,
    ],
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
