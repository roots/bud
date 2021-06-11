import path from 'path'
import globby from 'globby'
import {defaults} from 'ts-jest/presets'
import type {InitialOptionsTsJest} from 'ts-jest/dist/types'

const config: InitialOptionsTsJest = {
  transform: {
    ...defaults.transform,
  },
  collectCoverageFrom: globby.sync([
    'packages/@roots/src/**/*.{ts,tsx}',
    'packages/@roots/src/*.{ts,tsx}',
    '!**/node_modules/**',
    '!tests/util.ts',
  ]),
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  moduleNameMapper: globby
    .sync('packages/@roots/*/package.json', {absolute: true})
    .map(pkg => {
      const base = path.dirname(pkg)
      const {name} = require(pkg)

      return {
        [`${name}/(.*)$`]: `${base}/src/$1`,
      }
    })
    .reduce((pkgs, pkg) => ({...pkgs, ...pkg}), {}),
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
  ],
  verbose: true,
}

export default config
