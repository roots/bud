import {HotModuleReplacementPlugin} from 'webpack'
import WriteFilePlugin from 'write-file-webpack-plugin'
import BrowserSyncPlugin from 'browser-sync-webpack-plugin'

/**
 * Development plugins
 *
 * @typedef {function (options: bud.options, features: bud.features) => {array}} devPlugins
 * @param {options} options
 * @param {features} features
 * @return {array}
 */
const devPlugins = (options, features) => [
  ...(features.hot
    ? [new HotModuleReplacementPlugin()]
    : []),
  ...(!options.inProduction ? [new WriteFilePlugin()] : []),
  ...(features.browserSync == true &&
  features.debug == false
    ? [
        new BrowserSyncPlugin({
          host: options.browserSync.host,
          port: options.browserSync.port,
          proxy: options.browserSync.proxy,
        }),
      ]
    : []),
]

export {devPlugins}
