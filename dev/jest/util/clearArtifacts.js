const fs = require('fs-extra')
const globby = require('globby')
const path = require('path')

const OPTIONS = {onlyDirectories: true}

module.exports = async () => {
  const caches = await globby(
    path.join(process.cwd(), 'examples/*/.budfiles'),
    OPTIONS,
  )

  const sageCache = await globby(
    path.join(process.cwd(), 'examples/*/resources/storage'),
    OPTIONS,
  )

  const dists = await globby(
    path.join(process.cwd(), 'examples/*/dist'),
    OPTIONS,
  )

  await Promise.all(
    [...caches, ...sageCache, ...dists].map(
      async path => await fs.remove(path),
    ),
  )
}
