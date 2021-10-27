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

module.exports = async () => {
  await clearBudfiles()
  await install()

  const raw = await globby('examples/*/package.json')
  const paths = raw
    .filter(
      path =>
        !path.includes('examples/bedrock/package.json') &&
        !path.includes('examples/node-api/package.json') &&
        !path.includes('examples/multi-compiler/package.json'),
    )
    .map(s => ({
      manifest: s,
      manifestStr: readFileSync(s),
      cwd: process.cwd().concat(`/${dirname(s)}`),
    }))
    .map(s => ({
      ...s,
      name: s.cwd.split('examples/')[1],
    }))

  await paths.reduce(async (promised, {name, cwd}) => {
    await promised

    console.log('\n ', bold.underline`${name}`)
    console.log(`  path: ${cwd}`)

    console.log(blue`\n ${name} Installing`)

    const install = execa.command(`yarn bud init`, {cwd})
    install.stdout.pipe(process.stdout)
    install.stderr.pipe(process.stderr)
    await install.finally(noop)

    const build = execa.command(`yarn bud build --log --ci`, {
      cwd,
    })
    build.stdout.pipe(process.stdout)
    build.stderr.pipe(process.stderr)
    await build.finally(noop)

    return Promise.resolve({})
  }, Promise.resolve({}))

  await paths.reduce(
    async (promised, {name, manifest, manifestStr}) => {
      await promised

      console.log(blue`\n ${name} Restoring manifest`)
      await writeFile(manifest, manifestStr)

      return Promise.resolve({})
    },
    Promise.resolve({}),
  )
}
