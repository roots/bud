import {WriteFilePlugin} from './externals'
import {Plugin} from '@roots/bud-types'

const writeFile: Plugin = bud => ({
  bud,
  make: function () {
    return new WriteFilePlugin()
  },
})

export {writeFile}
