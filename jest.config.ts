import globby from 'globby'
import {dirname} from 'path'
import type {InitialOptionsTsJest} from 'ts-jest/dist/types'
import {defaults} from 'ts-jest/presets'

export default async function config(): Promise<InitialOptionsTsJest> {
  const moduleNameMapper = await mapModuleNames()

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
    ],
    extensionsToTreatAsEsm: ['.ts', '.tsx'],
    moduleNameMapper,
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

const mapModuleNames = async (): Promise<
  InitialOptionsTsJest['moduleNameMapper']
> => {
  const pkgs = await globby('packages/@roots/*/package.json', {
    absolute: true,
  })

  return pkgs.reduce(
    (pkgs, pkg) => ({
      ...pkgs,
      [`${require.resolve(pkg)}/(.*)$`]: `${dirname(
        pkg,
      )}/src/$1`,
    }),
    {},
  )
}
