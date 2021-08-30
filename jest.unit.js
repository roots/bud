const mapModuleNames = require('./dev/jest/moduleNameMapper')

/**
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
    moduleNameMapper,
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: [
      `<rootDir>/packages/@roots/*/src/__tests__/**/*.ts`,
      `<rootDir>/tests/unit/**/*.ts`,
    ],
  }
}
