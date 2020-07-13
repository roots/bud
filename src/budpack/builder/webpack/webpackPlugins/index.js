import {basePlugins} from './basePlugins'
import {conditionalPlugins} from './conditionalPlugins'
import {devPlugins} from './devPlugins'

/**
 * Webpack plugins
 *
 * @typedef {function (config: {options: bud.options, features: bud.features, paths: bud.paths}) => {object}} webpackPlugins
 * @param   {{options: bud.options, features: bud.features, paths: bud.paths}} config
 * @param   {options: bud.options} config.options
 * @param   {features: bud.features} config.features
 * @param   {paths: bud.paths} config.paths
 * @returns {object}
 */
const webpackPlugins = ({options, features, paths}) => ({
  plugins: [
    ...basePlugins(paths, features),
    ...devPlugins(options, features),
    ...conditionalPlugins(options, features),
  ],
})

export {webpackPlugins}
