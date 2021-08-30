const {globby} = require('@roots/bud-support')

module.exports = async function config() {
  // eslint-disable
  // @ts-ignore
  const moduleNameMapper = await mapModuleNames()

  return {
    displayName: {
      name: 'unit',
      color: 'blue',
    },
    extensionsToTreatAsEsm: ['.ts', '.tsx'],
    preset: 'ts-jest',
    globalSetup: '<rootDir>/dev/jest/jest.setup.js',
    globalTeardown: '<rootDir>/dev/jest/jest.teardown.js',
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
      `<rootDir>/tests/integration/**/*.ts`,
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
