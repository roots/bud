const {globby} = require('@roots/bud-support')
const {pathsToModuleNameMapper} = require('ts-jest/utils')
const {compilerOptions} = require('./tsconfig.jest')

module.exports = async function config() {
  return {
    displayName: {
      name: 'unit',
      color: 'blue',
    },
    extensionsToTreatAsEsm: ['.ts', '.tsx'],
    maxWorkers: '50%',
    preset: 'ts-jest',
    // globalSetup: '<rootDir>/jest.setup.js',
    // globalTeardown: '<rootDir>/jest.teardown.js',
    testEnvironment: 'node',
    collectCoverageFrom: [
      '<rootDir>/packages/@roots/**/*.ts',
      '<rootDir>/packages/@roots/**/*.tsx',
    ],
    coveragePathIgnorePatterns: [
      '@roots/bud-support',
      'node_modules',
      'types',
      'lib',
    ],
    coverageReporters: ['lcov', 'text', 'html'],
    globals: {
      'ts-jest': {
        tsconfig: `<rootDir>/tsconfig.json`,
        compiler: 'typescript',
      },
    },
    moduleNameMapper: pathsToModuleNameMapper(
      compilerOptions.paths,
      {prefix: '<rootDir>/'},
    ),
    testMatch: [
      `<rootDir>/tests/unit/**/*.ts`,
      `<rootDir>/tests/integration/**/*.ts`,
    ],
    testPathIgnorePatterns: [
      '/node_modules/',
      '/examples/',
      '/docs/',
      '/dev/',
      '/site/',
      '/tests/util',
    ],
    verbose: true,
  }
}

/**
 * Map module names to their respective paths.
 *
 * @returns {Promise<InitialOptionsTsJest['moduleNameMapper']>} - The jest module name mapper.
 */
const mapModuleNames = async () => {
  const pkgs = await globby.globby(
    'packages/@roots/*/package.json',
    {
      absolute: true,
    },
  )

  return pkgs.reduce((pkgs, pkg) => {
    const relativePath = pkg
      .split(process.cwd().concat('/packages/'))
      .pop()

    return {
      ...pkgs,
      [`^${relativePath}/(.*)$`]: `<rootDir>/${relativePath}/src/$1`,
    }
  }, {})
}
