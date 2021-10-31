// @ts-check

const mapModuleNames = require('./util/moduleNameMapper')

module.exports = async () => {
  const moduleNameMapper = await mapModuleNames()

  return {
    name: 'integration',
    displayName: {
      name: 'integration',
      color: 'blue',
    },
    globals: {
      'ts-jest': {
        tsconfig: '<rootDir>/dev/jest/tsconfig.jest.json',
        compiler: 'typescript',
      },
    },
    moduleNameMapper,
    rootDir: process.cwd(),
    globalSetup: '<rootDir>/dev/jest/util/setup.js',
    globalTeardown: '<rootDir>/dev/jest/util/teardown.js',
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: [
      `<rootDir>/tests/integration/**/*.ts`,
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
