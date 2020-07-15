import {base} from './base'
import {conditional} from './conditional'
import {dev} from './dev'

/**
 * Webpack plugins
 *
 * @typedef {function (config: {options: bud.options, features: bud.features, paths: bud.paths}) => {object}} plugins
 * @param   {{options: bud.options, features: bud.features, paths: bud.paths}} config
 * @param   {options: bud.options} config.options
 * @param   {features: bud.features} config.features
 * @param   {paths: bud.paths} config.paths
 * @returns {object}
 */
const plugins = ({options, features, paths}) => ({
  plugins: [
    ...base(paths, features),
    ...dev(options, features),
    ...conditional(options, features),
  ],
})

export {plugins}
