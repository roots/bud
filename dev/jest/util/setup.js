/* eslint-disable no-console */
// @ts-check

const execa = require('execa')
const {bold} = require('chalk')
const fs = require('fs-extra')
const clearArtifacts = require('./clearArtifacts')
const paths = require('./paths')

module.exports = async () => {
  await clearArtifacts()

  const examples = await paths()

  await Promise.all(
    examples.map(async ex => {
      console.log(
        `\n${bold.underline`${ex.name}`}\npath: ${ex.cwd}\n`,
      )

      try {
        const install = execa.command(`yarn`, {
          cwd: ex.cwd,
        })
        await install
      } catch (err) {
        console.log(err)
      }

      return ex
    }),
  )

  await Promise.all(
    examples.map(async ex => {
      try {
        const init = execa.command(`yarn bud init`, {
          cwd: ex.cwd,
        })
        await init
      } catch (err) {
        console.log(err)
      }

      return ex
    }),
  )

  await Promise.all(
    examples.map(async ex => {
      try {
        const build = execa.command(`yarn bud build`, {
          cwd: ex.cwd,
        })
        await build
      } catch (err) {
        console.log(err)
      }

      return ex
    }),
  )

  global.examples = examples
}
