import WriteFilePlugin from 'write-file-webpack-plugin'
import type {Plugin} from '@roots/bud-framework'

const writeFile: Plugin = bud => ({
  bud,

  make: function () {
    return new WriteFilePlugin()
  },
})

export {writeFile}
