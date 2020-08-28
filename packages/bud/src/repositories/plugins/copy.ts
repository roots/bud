import CopyWebpackPlugin from 'copy-webpack-plugin'

import type {Plugin} from '@roots/bud-framework'

const copy: Plugin = bud => ({
  bud,

  options: bud.options.get('webpack.plugins.copy'),

  make: function () {
    return new CopyWebpackPlugin(this.options)
  },

  when: function () {
    return this.options.patterns.length > 0
  },
})

export {copy}
