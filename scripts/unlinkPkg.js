const {join} = require('path')
const execa = require('execa')

const unlinkPkg = async pkg => {
  await execa('yarn', ['unlink'], {cwd: join(process.cwd(), pkg)})
  console.info(`${pkg} unlinked`)
}

module.exports = unlinkPkg
