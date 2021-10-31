/* eslint-disable no-console */
// @ts-check

const globby = require('globby')
const execa = require('execa')
const {dirname} = require('path')
const {noop} = require('lodash')
const {bold, blue} = require('chalk')
const {readFileSync, writeFile} = require('fs-extra')
const clearArtifacts = require('./clearArtifacts')

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
  await clearArtifacts()

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

  await Promise.all(
    paths.map(async ({name, cwd}) => {
      console.log(
        `\n${bold.underline`${name}`}\npath: ${cwd}\n${blue`\n${name} Installing`}`,
      )

      try {
        const install = execa.command(`yarn bud init`, {cwd})
        install.stdout.pipe(process.stdout)
        install.stderr.pipe(process.stderr)
        await install.finally(noop)
      } catch (err) {
        console.error(name, 'init', err)
      }

      try {
        const build = execa.command(`yarn bud build`, {
          cwd,
        })
        build.stdout.pipe(process.stdout)
        build.stderr.pipe(process.stderr)
        await build.finally(noop)
      } catch (err) {
        console.error(name, 'build', err)
      }
    }),
  )

  await Promise.all(
    paths.map(async ({name, manifest, manifestStr}) => {
      console.log(blue`\n${name} Restoring manifest`)
      try {
        await writeFile(manifest, manifestStr)
      } catch (err) {
        console.error(name, 'writeFile', err)
      }
    }),
  )
}
