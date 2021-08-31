const {globby} = require('@roots/bud-support')
const {dirname} = require('path')

/**
 * Map module names to their respective paths.
 *
 * @returns {Promise<InitialOptionsTsJest['moduleNameMapper']>} - The jest module name mapper.
 */
module.exports = async () => {
  const pkgs = await globby.globby('packages/@roots/*', {
    onlyDirectories: true,
  })

  return pkgs
    .map(pkg => pkg.replace('packages/', ''))
    .reduce(
      (mapping, pkg) => ({
        ...mapping,
        [`^${pkg}$`]: `<rootDir>/packages/${pkg}/src/index`,
        [`^${pkg}/(.*)$`]: `<rootDir>/packages/${pkg}/$1`,
      }),
      {},
    )
}
