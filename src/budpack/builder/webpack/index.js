import {devServer} from './devServer'
import {entry} from './entry'
import {externals} from './externals'
import {general} from './general'
import {loaders} from './loaders/loaders'
import {optimization} from './optimization'
import {output} from './output'
import {webpackResolve} from './webpackResolve'
import {webpackPlugins} from './webpackPlugins'

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
  ...loaders({options, features, configs, paths}),
  ...optimization({options, features}),
  ...webpackPlugins({options, features, paths}),
  ...webpackResolve({options, paths}),
  ...externals(options),
  ...devServer(options),
  ...general({paths, mode, features, options}),
})

export {makeWebpackConfig}
