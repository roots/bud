const {join} = require('path')
const execa = require('execa')
const {workspaces: packages} = require('../package.json')

const build = async () => {
  packages.forEach(async pkg => {
    await execa('yarn', ['build'], {cwd: join(process.cwd(), pkg)})
    console.info(`${pkg} built`)
  })
}

module.exports = build
