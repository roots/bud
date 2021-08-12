import type {InitialOptionsTsJest} from 'ts-jest/dist/types'
import {defaults} from 'ts-jest/presets'

export default async function config(): Promise<InitialOptionsTsJest> {
  return {
    ...defaults,
    coveragePathIgnorePatterns: [
      'types',
      'node_modules',
      'tests',
      'examples',
      'docs',
      '@roots/filesystem',
      '@roots/bud-typings',
      '@roots/bud-cli',
      '@roots/bud-support',
    ],
    extensionsToTreatAsEsm: ['.ts', '.tsx', '.jsx'],
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
      '/site/',
    ],
    verbose: true,
    maxWorkers: '50%',
  }
}
