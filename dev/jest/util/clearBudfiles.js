const {noop} = require('lodash')
const rimraf = require('rimraf')

module.exports = async () => {
  rimraf(
    `${process.cwd()}/examples/*/.budfiles/`,
    {
      glob: true,
    },
    noop,
  )
  return rimraf(
    `${process.cwd()}/examples/*/resources/storage/bud/`,
    {
      glob: true,
    },
    noop,
  )
}
