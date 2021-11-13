/* eslint-disable no-console */
// @ts-check

const globby = require('globby')
const {dirname, join} = require('path')
const {readFileSync} = require('fs-extra')

const IGNORE_LIST = [
  `examples/bedrock/package.json`,
  `examples/critical-css/package.json`,
]

module.exports = async () => {
  const search = await globby(`examples/*/package.json`)

  const paths = search
    .filter(path => !IGNORE_LIST.includes(path))
    .map(manifest => ({
      manifest,
      manifestStr: readFileSync(manifest),
      cwd: join(process.cwd(), dirname(manifest)),
    }))
    .map(manifest => ({
      ...manifest,
      name: manifest.cwd.split('examples/')[1],
    }))

  console.log('\nprojects')
  paths.forEach(path => console.log(`- ${path.name}`))

  console.log('\nignoring')
  IGNORE_LIST.forEach(path => console.log(`- ${path}`))
  return paths
}
