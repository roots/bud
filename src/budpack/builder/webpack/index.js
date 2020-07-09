import devServer from './devServer'
import {entry} from './entry'
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
 * @param  {import('./../base/mode').inProduction} inProduction
 * @param  {import('./../base/mode').mode} mode
 * @param  {import('./../base/configs')} configs
 * @param  {import('./../base/options')} options
 * @param  {import('./../base/features')} features
 * @param  {import('./../base/paths')} paths
 * @return {object}
 */
const makeWebpackConfig = ({
  mode,
  configs,
  options,
  features,
  paths,
}) => ({
  ...entry(options),
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
