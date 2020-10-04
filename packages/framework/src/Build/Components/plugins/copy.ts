import * as Extension from '../../../Extend/Extension'
import {CopyWebpackPlugin} from './externals'

const copy: Extension.Factory = bud => ({
  bud,

  options: {
    patterns: [],
  },

  make: function () {
    return new CopyWebpackPlugin(this.options)
  },

  when: function () {
    return this.options.patterns.length > 0
  },
})

export {copy as default}
