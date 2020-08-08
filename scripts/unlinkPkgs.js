const {workspaces: packages} = require('../package.json')
const unlinkPkg = require('./unlinkPkg')

const unlinkPkgs = async () => {
  packages.forEach(async pkg => await unlinkPkg(pkg))
}

module.exports = unlinkPkgs
