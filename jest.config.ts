import {globby} from '@roots/bud-support'
import type {InitialOptionsTsJest} from 'ts-jest/dist/types'

export default async function config(): Promise<InitialOptionsTsJest> {
  const moduleNameMapper = await mapModuleNames()

  return {
    displayName: {
      name: 'unit',
      color: 'blue',
    },
    extensionsToTreatAsEsm: ['.ts', '.tsx'],
    maxWorkers: '50%',
    preset: 'ts-jest',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    testEnvironment: 'node',
    collectCoverageFrom: [
      `<rootDir>/packages/@roots/*/src/**/*`,
    ],
    coveragePathIgnorePatterns: [`@roots/bud-support`],
    coverageReporters: ['lcov', 'text', 'html'],
    globals: {
      'ts-jest': {
        tsconfig: `<rootDir>/tsconfig.jest.json`,
        compiler: 'typescript',
      },
    },
    moduleNameMapper,
    testMatch: [`<rootDir>/tests/**/*.ts`],
    testPathIgnorePatterns: [
      '/node_modules/',
      '/examples/',
      '/docs/',
      '/dev/',
      '/site/',
    ],
    verbose: true,
  }
}

/**
 * Map module names to their respective paths.
 *
 * @returns {Promise<InitialOptionsTsJest['moduleNameMapper']>} - The jest module name mapper.
 */
const mapModuleNames = async (): Promise<
  InitialOptionsTsJest['moduleNameMapper']
> => {
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
