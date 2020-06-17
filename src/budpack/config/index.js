import optimization from './optimization'
import output from './output'
import options from './options'
import plugins from './plugins'
import loaders from './loaders'
import resolve from './resolve'
import devServer from './devServer'

/**
 * Webpack config
 *
 * @param  {object} config overrides
 * @return {object} final webpack configuration
 */
const budpackConfig = bud => ({
  entry: bud.options.entry,
  ...optimization(bud),
  ...plugins(bud),
  ...output(bud),
  ...loaders(bud),
  ...options(bud),
  ...resolve(bud),
  ...devServer(bud),
})

export default budpackConfig
