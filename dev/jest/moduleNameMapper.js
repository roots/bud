const globby = require('globby')

/**
 * Map module names to their respective paths.
 *
 * @returns {Promise<InitialOptionsTsJest['moduleNameMapper']>} - The jest module name mapper.
 */
module.exports = async () => {
  const packages = await globby('sources/@roots/*', {
    onlyDirectories: true,
  })

  return packages
    .map(pkg => pkg.replace('sources/', ''))
    .reduce(
      (mapping, pkg) => ({
        ...mapping,
        [`^${pkg}$`]: `<rootDir>/sources/${pkg}/src/index`,
        [`^${pkg}/(.*)$`]: `<rootDir>/sources/${pkg}/$1`,
      }),
      {},
    )
}
