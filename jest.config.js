const mapModuleNames = require('./dev/jest/moduleNameMapper')

/**
 * Jest configuration
 */
module.exports = async function config() {
  const moduleNameMapper = await mapModuleNames()

  return {
    extensionsToTreatAsEsm: ['.ts', '.tsx'],
    preset: 'ts-jest',
    testEnvironment: 'node',
    collectCoverageFrom: [
      'packages/@roots/*/lib/cjs/**/*',
      '!packages/@roots/bud-support/**/*',
      '!packages/@roots/filesystem/**/*',
    ],
    coverageReporters: ['lcov', 'text', 'html'],
    globals: {
      'ts-jest': {
        tsconfig: '<rootDir>/tsconfig.jest.json',
        compiler: 'typescript',
      },
    },
    moduleNameMapper,
    projects: [
      '<rootDir>/jest.unit.js',
      '<rootDir>/jest.integration.js',
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
