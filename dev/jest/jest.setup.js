/* eslint-disable no-console */
// @ts-check

const globby = require('globby')
const execa = require('execa')
const {dirname} = require('path')
const {noop} = require('lodash')
const {bold, blue} = require('chalk')
const {readFileSync, writeFile} = require('fs-extra')
const clearBudfiles = require('./util/clearBudfiles')
const {install} = require('./util/dependencies')

const IGNORE_LIST = [
  'examples/bedrock/package.json',
  'examples/node-api/package.json',
  'examples/multi-compiler/package.json',
  'examples/sass/package.json',
  'examples/basic/package.json',
  'examples/preset-recommend/package.json',
  'examples/typescript/package.json',
]

module.exports = async () => {
  await clearBudfiles()
  await install()

  const search = await globby(`examples/*/package.json`)
  const paths = search
    .filter(IGNORE_LIST.includes)
    .map(manifest => ({
      manifest: manifest,
      manifestStr: readFileSync(manifest),
      cwd: process.cwd().concat(`/${dirname(manifest)}`),
    }))
    .map(manifest => ({
      ...manifest,
      name: manifest.cwd.split('examples/')[1],
    }))

  await Promise.all(
    paths.map(async ({name, cwd}) => {
      console.log(
        `\n${bold.underline`${name}`}\npath: ${cwd}\n${blue`\n${name} Installing`}`,
      )

      const install = execa.command(`yarn bud init`, {cwd})
      install.stdout.pipe(process.stdout)
      install.stderr.pipe(process.stderr)
      await install.finally(noop)

      const build = execa.command(`yarn bud build`, {cwd})
      build.stdout.pipe(process.stdout)
      build.stderr.pipe(process.stderr)
      await build.finally(noop)
    }),
  )

  await Promise.all(
    paths.map(async ({name, manifest, manifestStr}) => {
      console.log(blue`\n${name} Restoring manifest`)
      await writeFile(manifest, manifestStr)
    }),
  )
}
