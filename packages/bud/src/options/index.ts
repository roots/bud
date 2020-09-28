import webpack from './webpack/index'
import plugins from './plugins'
import server from './server'

import {postcss} from './postcss'

/**
 * Options container repository
 */
export const options = {
  /**
   * Postcss options
   */
  postcss,

  /**
   * Development server options.
   */
  server,

  /**
   * Webpack options.
   */
  webpack,

  /**
   * Webpack plugin options.
   */
  plugins,

  /**
   * @todo Junk drawer..
   */
  split: {
    maxChunks: -1,
  },
  filenameTemplate: {
    hashed: '[name].[hash:8]',
    default: '[name]',
  },
  manifest: {
    name: 'manifest.json',
  },
}
