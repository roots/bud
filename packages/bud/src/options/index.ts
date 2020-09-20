import plugins from './plugins'
import server from './server'
import webpack from './webpack'

/**
 * Options container repository
 */
const options = {
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
    maxChunks: 9999,
  },
  filenameTemplate: {
    hashed: '[name].[hash:8]',
    default: '[name]',
  },
  manifest: {
    name: 'manifest.json',
  },
}

export {options as default}
