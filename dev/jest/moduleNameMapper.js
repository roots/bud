const {globby} = require('@roots/bud-support')

/**
 * Map module names to their respective paths.
 *
 * @returns {Promise<InitialOptionsTsJest['moduleNameMapper']>} - The jest module name mapper.
 */
module.exports = {
  mapModuleNames: async () => {
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
  },
}
