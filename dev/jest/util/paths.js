/* eslint-disable no-console */
// @ts-check

const globby = require('globby')
const {dirname} = require('path')
const {readFileSync} = require('fs-extra')

const IGNORE_LIST = []

module.exports = async () => {
  const search = await globby(`examples/*/package.json`)

  const paths = search
    .filter(path => !IGNORE_LIST.includes(path))
    .map(manifest => ({
      manifest: manifest,
      manifestStr: readFileSync(manifest),
      cwd: process.cwd().concat(`/${dirname(manifest)}`),
    }))
    .map(manifest => ({
      ...manifest,
      name: manifest.cwd.split('examples/')[1],
    }))

  return paths
}
