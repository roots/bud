import externals from './externals'
import optimization from './optimization'
import output from './output'
import general from './general'
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
const budpackConfig = options => ({
    entry: options.entry,
    ...output(options.dist, options.hashed),
    ...loaders(options),
    ...general(options),
    ...optimization(options),
    ...plugins(options),
    ...resolve(options),
    ...externals(options),
    ...devServer(options),
})

export default budpackConfig
