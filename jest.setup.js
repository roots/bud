/* eslint-disable no-console */
const {globby} = require('@roots/bud-support')
const execa = require('execa')
const {readJsonSync, readFileSync} = require('fs-extra')
const {dirname} = require('path')

module.exports = async function () {
  packages = globby
    .globbySync('examples/**/package.json')
    .reduce(
      (jsons, path) => ({
        ...jsons,
        [`${path}`]: [
          readJsonSync(path),
          readFileSync(path, 'utf8'),
        ],
      }),
      {},
    )

  Object.entries(packages).map(([k, v]) => {
    v = v.shift()
    if (!v) {
      console.log(packages, k)
      return
    }
    console.log(`installing ${v.name}`)

    const pregame = execa.commandSync(
      `yarn bud extensions:install`,
      {cwd: dirname(k)},
    )
    pregame.stdout && console.log(pregame.stdout)

    console.log(`building ${v.name}`)

    const idontEvenLikeFootball = execa.commandSync(
      `yarn bud build`,
      {cwd: dirname(k)},
    )
    idontEvenLikeFootball.stdout &&
      console.log(idontEvenLikeFootball.stdout)
  })

  global.packages = packages
  return global
}
