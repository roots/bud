/* eslint-disable no-console */
const {globby} = require('@roots/bud-support')
const execa = require('execa')
const {readJsonSync, readFileSync} = require('fs-extra')
const {dirname} = require('path')

/**
 * Setup integration tests
 */
module.exports = async function () {
  packages = globby.globbySync('examples/*/package.json').reduce(
    (jsons, path) => ({
      ...jsons,
      [`${path}`]: [
        readJsonSync(path),
        readFileSync(path, 'utf8'),
      ],
    }),
    {},
  )

  console.log(
    'Running jest setup script for the following:',
    packages,
  )

  Object.entries(packages).map(([k, v]) => {
    v = v.shift()
    if (!v) {
      console.log(packages, k)
      return
    }

    console.log(`${v.name}\n------------`)

    /**
     * Install project peer deps
     */
    const pregame = execa.commandSync(
      `yarn bud extensions:install`,
      {cwd: dirname(k)},
    )

    pregame.stdout && console.log(pregame.stdout)

    /**
     * Build project
     */
    const idontEvenLikeFootball = execa.commandSync(
      `yarn bud build`,
      {cwd: dirname(k)},
    )

    idontEvenLikeFootball.stdout &&
      console.log(idontEvenLikeFootball.stdout)
  })

  /**
   * Assign all packages to global so we can uninstall on exit
   */
  global.packages = packages

  return global
}
