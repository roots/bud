const {workspaces} = require('../package.json')
const linkPkg = require('./linkPkg')

const linkPkgs = async () => {
  workspaces.forEach(async pkg => await linkPkg(pkg))
}

module.exports = linkPkgs
