/* eslint-disable no-console */
// @ts-check

const path = require('path')
const fs = require('fs-extra')
const globby = require('globby')

module.exports = async () => {
  const manifests = await globby(
    path.join(
      process.cwd(),
      'examples',
      '*',
      'package.bkup.json',
    ),
  )

  await Promise.all(
    manifests.map(async manifestPath => {
      const manifest = await fs.readFile(manifestPath, 'utf8')
      await fs.writeFile(
        manifestPath.replace(`.bkup.json`, `.json`),
        manifest,
      )
    }),
  )
}
