const {noop} = require('lodash')
const rimraf = require('rimraf')

module.exports = async () => {
  return rimraf(
    `${process.cwd()}/examples/*/.budfiles`,
    {
      glob: true,
    },
    noop,
  )
}
