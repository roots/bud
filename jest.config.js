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
    setupFilesAfterEnv: ['./jest.setup.ts'],
    testEnvironment: 'node',
    collectCoverageFrom: [`packages/@roots/*/lib/cjs/**/*`],
    coveragePathIgnorePatterns: [
      `@roots/bud-support`,
      `node_modules`,
      `types`,
    ],
    moduleNameMapper,
    globals: {
      'ts-jest': {
        tsconfig: `tsconfig.jest.json`,
        compiler: 'typescript',
      },
    },
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
      [`^${relativePath}/(.*)$`]: `<rootDir>/${relativePath}/lib/$1`,
    }
  }, {})
}
