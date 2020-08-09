const build = require('./build')
const linkPkgs = require('./linkPkgs')

const postinstall = async () => {
  await build()
  await linkPkgs()
}

module.exports = postinstall()
