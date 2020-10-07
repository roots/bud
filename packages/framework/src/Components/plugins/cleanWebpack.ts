import {CleanWebpackPlugin} from 'clean-webpack-plugin'

const cleanWebpack: Framework.Extension.Factory = bud => ({
  bud,

  options: {},

  make: function (): CleanWebpackPlugin {
    return new CleanWebpackPlugin(this.options)
  },

  when: function () {
    return this.bud.store['features'].enabled('clean')
  },
})

export {cleanWebpack as default}
