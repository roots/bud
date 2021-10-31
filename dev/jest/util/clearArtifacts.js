const fs = require('fs-extra')
const globby = require('globby')

const OPTIONS = {onlyDirectories: true}

module.exports = async () => {
  const caches = await globby(
    `${process.cwd()}/examples/*/.budfiles`,
    OPTIONS,
  )

  const sageCache = await globby(
    `${process.cwd()}/examples/*/resources/storage/bud/`,
    OPTIONS,
  )

  const dists = await globby(
    `${process.cwd()}/examples/*/dist`,
    OPTIONS,
  )

  await fs.copy(
    `${process.cwd()}/examples/`,
    __dirname.concat('tmp'),
  )

  await Promise.all(
    [...caches, ...sageCache, ...dists].map(
      async path => await fs.remove(path),
    ),
  )
}
