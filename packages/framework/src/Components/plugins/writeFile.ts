import {WriteFilePlugin} from './externals'

const writeFile: Framework.Extension.Factory = bud => ({
  bud,

  make: function () {
    return new WriteFilePlugin()
  },
})

export {writeFile as default}
