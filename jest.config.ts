import {globby} from '@roots/bud-support'
import {dirname} from 'path'
import type {InitialOptionsTsJest} from 'ts-jest/dist/types'
import {defaultsESM as tsjPreset} from 'ts-jest/presets'

export default async function config(): Promise<InitialOptionsTsJest> {
  // @ts-ignore
  const moduleNameMapper = await mapModuleNames()
  // @ts-ignore
  const packages = await makePackages(moduleNameMapper)
  // @ts-ignore
  const examples = await makeExamples(moduleNameMapper)

  return {
    ...tsjPreset,
    extensionsToTreatAsEsm: ['.ts', '.tsx'],
    maxWorkers: '50%',
    preset: 'ts-jest',
    projects: [...packages, ...examples],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    testEnvironment: 'node',
    testPathIgnorePatterns: [
      '/node_modules/',
      '/examples/',
      '/docs/',
      '/dev/',
      '/site/',
    ],
    transform: {
      ...tsjPreset.transform,
    },
    verbose: true,
  }
}

const makePackages = async (
  moduleNameMapper: InitialOptionsTsJest['moduleNameMapper'],
): Promise<InitialOptionsTsJest['projects']> => {
  const paths = await globby.globby(
    'packages/@roots/*/package.json',
    {
      absolute: true,
    },
  )

  return paths
    .map(pkg =>
      dirname(pkg.split(process.cwd().concat('/')).pop()),
    )
    .reduce((projects, project) => {
      const relativePath = project.split(process.cwd()).pop()
      const displayName = relativePath.split('packages/').pop()
      const testPath = relativePath.replace(
        'packages/@roots/',
        'tests/unit/',
      )

      return [
        ...projects,
        {
          displayName: {
            name: displayName,
            color: 'blue',
          },
          ...tsjPreset,
          collectCoverageFrom: [
            `<rootDir>/${relativePath}/src/**/*`,
          ],
          coveragePathIgnorePatterns: [`@roots/bud-support`],
          coverageReporters: ['lcov', 'text', 'html'],
          globals: {
            'ts-jest': {
              tsconfig: `<rootDir>/${relativePath}/tsconfig-esm.json`,
              compiler: 'typescript',
            },
          },
          maxWorkers: '50%',
          preset: 'ts-jest',
          setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
          testMatch: [`<rootDir>/${testPath}/**/*.ts`],
          testEnvironment: 'node',
          testPathIgnorePatterns: [
            '/node_modules/',
            '/examples/',
            '/docs/',
            '/dev/',
            '/site/',
          ],
          transform: {
            ...tsjPreset.transform,
          },
        },
      ]
    }, [])
}

const makeExamples = async (
  moduleNameMapper: InitialOptionsTsJest['moduleNameMapper'],
): Promise<InitialOptionsTsJest['projects']> => {
  const paths = await globby.globby('examples/*/package.json', {
    absolute: true,
  })

  return paths
    .map(pkg =>
      dirname(pkg.split(process.cwd().concat('/')).pop()),
    )
    .reduce((examples, example) => {
      const relativePath = example.split(process.cwd()).pop()
      const displayName = relativePath.split('examples/').pop()
      const testPath = relativePath.replace(
        'examples/',
        'tests/integration/',
      )

      return [
        ...examples,
        {
          displayName: {
            name: displayName,
            color: 'blue',
          },
          ...tsjPreset,
          extensionsToTreatAsEsm: ['.ts', '.tsx'],
          globals: {
            'ts-jest': {
              tsconfig: `<rootDir>/tsconfig.jest.json`,
              compiler: 'typescript',
            },
          },
          moduleNameMapper,
          preset: 'ts-jest',
          setupFiles: ['./jest.setup.ts'],
          testMatch: [`<rootDir>/${testPath}.test.ts`],
          testEnvironment: 'node',
          testPathIgnorePatterns: [
            '/node_modules/',
            '/examples/',
            '/docs/',
            '/dev/',
            '/site/',
          ],
          transform: {
            ...tsjPreset.transform,
          },
          verbose: true,
        },
      ]
    }, [])
}

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
      [`${relativePath}/(.*)$`]: `<rootDir>/${relativePath}/src/$1`,
    }
  }, {})
}
