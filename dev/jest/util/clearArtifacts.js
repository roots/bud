const fs = require('fs-extra')
const globby = require('globby')
const path = require('path')

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

  await fs.remove(
    path.join(process.cwd(), 'dev', 'jest', 'util', '.tmp/'),
  )
  await fs.copy(
    path.join(process.cwd(), 'examples/'),
    path.join(process.cwd(), 'dev', 'jest', 'util', '.tmp/'),
  )

  await Promise.all(
    [...caches, ...sageCache, ...dists].map(
      async path => await fs.remove(path),
    ),
  )
}
