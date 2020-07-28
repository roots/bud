import WriteFilePlugin from 'write-file-webpack-plugin'
import type {WebpackAdapter} from './types'

const writeFile: WebpackAdapter = () => ({
  make: function () {
    return new WriteFilePlugin()
  },
  when: function () {
    return true
  },
})

export {writeFile}
