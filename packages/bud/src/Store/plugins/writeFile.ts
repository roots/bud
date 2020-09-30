import {WriteFilePlugin} from './externals'
import Bud from '@roots/bud-types'

const writeFile: Bud.Plugin.Factory = bud => ({
  bud,

  make: function () {
    return new WriteFilePlugin()
  },
})

export {writeFile as default}
