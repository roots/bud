const globby = require('globby')

/**
 * Map module names to their respective paths.
 *
 * @returns {Promise<InitialOptionsTsJest['moduleNameMapper']>} - The jest module name mapper.
 */
module.exports = async () => {
  const packages = await globby('packages/@roots/*', {
    onlyDirectories: true,
  })

  return packages
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
