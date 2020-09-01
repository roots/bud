import {WriteFilePlugin} from './externals'
import {Plugin} from '@roots/bud-typings'

const writeFile: Plugin = bud => ({
  bud,
  make: function () {
    return new WriteFilePlugin()
  },
})

export {writeFile}
