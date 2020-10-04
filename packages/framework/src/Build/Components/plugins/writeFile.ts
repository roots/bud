import * as Extension from '../../../Extend/Extension'
import {WriteFilePlugin} from './externals'

const writeFile: Extension.Factory = bud => ({
  bud,

  make: function () {
    return new WriteFilePlugin()
  },
})

export {writeFile as default}
