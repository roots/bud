import {CleanWebpackPlugin} from 'clean-webpack-plugin'

const cleanWebpack = () => ({
  make: function () {
    return new CleanWebpackPlugin()
  },
})

export {cleanWebpack}
