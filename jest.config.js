const mapModuleNames = require('./dev/jest/util/moduleNameMapper')

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
      'packages/@roots/**/*.{ts,tsx}',
      '!packages/@roots/**/*.d.ts',
      '!packages/@roots/bud-support/**/*',
      '!packages/@roots/filesystem/**/*',
    ],
    coverageReporters: ['lcov', 'text', 'text-summary'],
    globals: {
      'ts-jest': {
        tsconfig: '<rootDir>/tsconfig.jest.json',
        compiler: 'typescript',
      },
    },
    moduleNameMapper,
    projects: [
      '<rootDir>/dev/jest/jest.all.js',
      '<rootDir>/dev/jest/jest.unit.js',
      '<rootDir>/dev/jest/jest.integration.js',
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
    verbose: true,
  }
}
