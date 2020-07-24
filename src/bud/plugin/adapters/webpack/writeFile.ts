import WriteFilePlugin from 'write-file-webpack-plugin'
import type {WebpackAdapter} from './types'

const writeFile: WebpackAdapter = () => ({
  make: function () {
    return new WriteFilePlugin()
  },
  when: function () {
    return !this.bud.inProduction
  },
})

export {writeFile}
