const devServer = require('./devServer')
const entry = require('./entry')
const optimization = require('./optimization')
const output = require('./output')
const options = require('./options')
const plugins = require('./plugins')
const resolve = require('./resolve')
const loaders = require('./loaders')

/**
 * Default config
 *
 * @type {object} default webpack configuration
 */
const DEFAULT_CONFIG = {
  entry: {},
  loaders: [],
  plugins: [],
  aliases: {},
  optimization: {},
  dev: {
    host: 'localhost',
    port: 3030,
  },
}

/**
 * Webpack config
 *
 * @param  {object} config overrides
 * @return {object} final webpack configuration
 */
const webpack = (config = DEFAULT_CONFIG) => ({
  ...entry({
    entry: config.entry,
  }),
  ...resolve({
    aliases: config.aliases,
  }),
  ...optimization({
    optimization: config.optimization,
  }),
  ...plugins({
    dev: config.dev,
    plugins: config.plugins,
  }),
  ...devServer({
    devServer: config.dev,
  }),
  ...output({
    dev: config.dev,
  }),
  ...loaders({
    loaders: config.loaders,
  }),
  ...options({
    options: config.options,
  }),
})

module.exports = {
  webpack,
  defaults: DEFAULT_CONFIG,
}
