import CopyWebpackPlugin from 'copy-webpack-plugin'
import type {WebpackAdapter} from './types'

const copy: WebpackAdapter = () => ({
  mergeOptions: function () {
    if (this.bud.state.options.copy.patterns.length > 0) {
      return this.bud.state.options.copy
    }
  },
  make: function () {
    return new CopyWebpackPlugin(this.options)
  },
  when: function () {
    return this.options
  },
})

export {copy}
