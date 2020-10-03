import {WriteFilePlugin} from './externals'
import * as Extension from './../../Extend/Extension'

const writeFile: Extension.Factory = bud => ({
  bud,

  make: function () {
    return new WriteFilePlugin()
  },
})

export {writeFile as default}
