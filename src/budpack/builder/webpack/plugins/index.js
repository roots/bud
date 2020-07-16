import {base} from './base'
import {conditional} from './conditional'
import {dev} from './dev'

/**
 * Webpack plugins
 *
 * @typedef {function (bud: object) => {object}} plugins
 * @param   {{options: bud.options, features: bud.features, paths: bud.paths}} config
 * @param   {options: bud.options} config.options
 * @param   {features: bud.features} config.features
 * @param   {paths: bud.paths} config.paths
 * @returns {object}
 */
const plugins = bud => ({
  plugins: [
    ...base(bud.paths, bud.features),
    ...dev(bud.options, bud.features),
    ...conditional(bud.options, bud.features),
  ],
})

export {plugins}
