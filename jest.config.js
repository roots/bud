const path = require('path')
const globby = require('globby')

module.exports = {
  preset: 'ts-jest',
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
  ],

  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.dev.json',
    },
  },

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
}
