const {join} = require('path')
const execa = require('execa')

const linkPkg = async pkg => {
  await execa('yarn', ['link'], {cwd: join(process.cwd(), pkg)})
  console.info(`${pkg} linked`)
}

module.exports = linkPkg
