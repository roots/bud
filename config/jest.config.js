const {resolve} = require('path')
const mapModuleNames = require('../dev/jest/moduleNameMapper')

/**
 * Jest configuration
 */
module.exports = async function config() {
  const moduleNameMapper = await mapModuleNames()

  return {
    collectCoverageFrom: [
      'sources/@roots/**/*.{ts,tsx}',
      '!sources/@roots/**/*.d.ts',
    ],
    coveragePathIgnorePatterns: [
      'sources/@roots/bud-support/',
      'sources/@roots/filesystem/',
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
    globalSetup: '<rootDir>/dev/jest/setup.global.js',
    moduleNameMapper,
    name: 'bud',
    preset: 'ts-jest',
    rootDir: resolve(__dirname, '../'),
    setupFilesAfterEnv: ['<rootDir>/dev/jest/setup.afterEnv.js'],
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
  }
}
