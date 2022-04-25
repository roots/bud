const REPO_PATH = __dirname.split('/sources/').shift()

const {
  globby,
} = require(`${REPO_PATH}/sources/@roots/bud-support/lib/cjs/index.js`)

module.exports = async () => {
  const packages = await globby.globby('sources/@roots/*', {
    onlyDirectories: true,
  })

  return packages
    .map(pkg => pkg.replace('sources/', ''))
    .reduce(
      (mapping, pkg) => ({
        ...mapping,
        [`^${pkg}$`]: `<rootDir>/sources/${pkg}/src/index`,
        [`^${pkg}/(.*)$`]: `<rootDir>/sources/${pkg}/src/$1`,
        '@roots/bud-support': `<rootDir>/sources/@roots/bud-support/lib/cjs/index`,
      }),
      {},
    )
}
