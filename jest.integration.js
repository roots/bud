const mapModuleNames = require('./dev/jest/moduleNameMapper')

/**
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
    globalSetup: '<rootDir>/dev/jest/jest.setup.js',
    globalTeardown: '<rootDir>/dev/jest/jest.teardown.js',
    moduleNameMapper,
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: [`<rootDir>/tests/integration/**/*.ts`],
  }
}
