const build = require('./build')
const linkPkgs = require('./linkPkgs')

const postinstall = async () => {
  await linkPkgs()
  await build()
}

module.exports = postinstall()
