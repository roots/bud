import devServer from './devServer'
import externals from './externals'
import {general} from './general'
import {loaders} from './loaders'
import {optimization} from './optimization'
import output from './output'
import plugins from './plugins'
import resolve from './resolve'

/**
 * Make Webpack Config
 *
 * @param  {boolean.<inProduction>}
 * @param  {string.<mode>}
 * @param  {object.<options>}
 * @return {object}
 */
const makeWebpackConfig = ({
  inProduction,
  mode,
  configs,
  options,
  features,
  paths,
}) => ({
  entry: options.entry,
  ...output({paths, features}),
  ...loaders({options, features, configs}),
  ...optimization({options, features}),
  ...plugins({options, features, paths}),
  ...resolve({options, paths}),
  ...externals(options),
  ...devServer(options),
  ...general({paths, mode, features, options}),
})

export {makeWebpackConfig}
