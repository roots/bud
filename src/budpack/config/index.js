import externals from './externals'
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
const budpackConfig = project => ({
  entry: project.entry,
  ...optimization(project),
  ...plugins(project),
  ...output(project),
  ...loaders(project),
  ...options(project),
  ...resolve(project),
  ...externals(project),
  ...devServer(project),
})

export default budpackConfig
