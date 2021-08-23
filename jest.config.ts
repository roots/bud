import type {InitialOptionsTsJest} from 'ts-jest/dist/types'
import {defaults} from 'ts-jest/presets'

export default async function config(): Promise<InitialOptionsTsJest> {
  return {
    ...defaults,
    coveragePathIgnorePatterns: [
      '.yarn',
      '.vscode',
      '.github',
      '.budfiles',
      'dev',
      'examples',
      'node_modules',
      'packages/@roots/bud-support',
      'packages/deprecated',
      'packages/roots-notifier',
      'site',
      'tests',
      'types',
    ],
    extensionsToTreatAsEsm: ['.ts', '.tsx'],
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
      '/site/',
    ],
    verbose: true,
    maxWorkers: '50%',
  }
}
