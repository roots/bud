import CopyWebpackPlugin from 'copy-webpack-plugin'
import type {WebpackAdapter} from './types'

const copy: WebpackAdapter = () => ({
  mergeOptions: function () {
    if (this.bud.options.get('copy').patterns.length > 0) {
      return this.bud.options.get('copy')
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
