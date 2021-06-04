const path = require('path')
const globby = require('globby')

module.exports = {
  collectCoverageFrom: globby.sync([
    'packages/@roots/src/**/*.{ts,tsx}',
    'packages/@roots/src/*.{ts,tsx}',
    '!**/node_modules/**',
    '!tests/util.ts',
  ]),
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.dev.json',
    },
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  moduleNameMapper: globby
    .sync('packages/@roots/*/package.json', {absolute: true})
    .map(package => {
      const base = path.dirname(package)
      const {name} = require(package)

      return {[`${name}/(.*)$`]: `${base}/src/$1`}
    })
    .reduce(
      (packages, package) => ({...packages, ...package}),
      {},
    ),
  preset: 'ts-jest',
  setupFiles: ['./jest.setup.ts'],
  testMatch: [
    '**/tests/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)',
  ],
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    '/node_modules/',
    '/examples/',
    '/docs/',
    '/dev/',
    '/tests/util',
  ],

  verbose: true,
}
