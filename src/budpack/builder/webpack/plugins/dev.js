import BrowserSyncPlugin from 'browser-sync-webpack-plugin'
import {HotModuleReplacementPlugin} from 'webpack'
import WriteFilePlugin from 'write-file-webpack-plugin'

/**
 * Development plugins
 *
 * @typedef {function (options: bud.options, features: bud.features) => {array}} dev
 * @param {options} options
 * @param {features} features
 * @return {array}
 */
const dev = (options, features) => [
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

export {dev}
