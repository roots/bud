import devServer from './devServer'
import entry from './entry'
import optimization from './optimization'
import output from './output'
import options from './options'
import plugins from './plugins'
import resolve from './resolve'
import loaders from './loaders'

/**
 * Default config
 *
 * @type {object} default webpack configuration
 */
const config = {
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
const budpackConfig = () => ({
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

export default budpackConfig
