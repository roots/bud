// @ts-check

const mapModuleNames = require('./util/moduleNameMapper')

module.exports = async () => {
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
    rootDir: process.cwd(),
    globalSetup: '<rootDir>/dev/jest/util/setup.js',
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: [
      `<rootDir>/tests/unit/**/*.ts`,
      `!**/__mocks__/**/*`,
    ],
    testPathIgnorePatterns: [
      '/node_modules/',
      '/tests/util/',
      '/tests/.*?/__mocks__/',
    ],
  }
}
