// @ts-check

const mapModuleNames = require('./moduleNameMapper')

module.exports = async function config() {
  const moduleNameMapper = await mapModuleNames()

  return {
    name: 'unit',
    displayName: {
      name: 'unit',
      color: 'blue',
    },
    globals: {
      'ts-jest': {
        tsconfig: '<rootDir>/dev/jest/tsconfig.jest.json',
        compiler: 'typescript',
      },
    },
    moduleNameMapper,
    globalSetup: '<rootDir>/dev/jest/jest.setup.js',
    globalTeardown: '<rootDir>/dev/jest/jest.teardown.js',
    preset: 'ts-jest',
    rootDir: process.cwd(),
    testEnvironment: 'node',
    testMatch: [
      `<rootDir>/tests/unit/**/*.ts`,
      `!**/__mocks__/**/*`,
    ],
    testPathIgnorePatterns: [
      '/node_modules/',
      '/examples/',
      '/docs/',
      '/dev/',
      '/site/',
      '/tests/util/',
      '/tests/.*?/__mocks__/',
    ],
  }
}
