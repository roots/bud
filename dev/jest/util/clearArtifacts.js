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

  const manifests = await globby(
    path.join(process.cwd(), 'examples', '*', 'package.json'),
  )
  await Promise.all(
    manifests.map(async manifestPath => {
      const manifest = await fs.readFile(manifestPath, 'utf8')
      await fs.writeFile(
        manifestPath.replace('.json', '.bkup.json'),
        manifest,
      )
    }),
  )

  await Promise.all(
    [...caches, ...sageCache, ...dists].map(
      async path => await fs.remove(path),
    ),
  )
}
