import WriteFilePlugin from 'write-file-webpack-plugin'
import type {Extension} from './index'

const writeFile: Extension = bud => ({
  bud,

  name: 'write-file-webpack-plugin',

  make: function () {
    return new WriteFilePlugin()
  },
})

export {writeFile}
