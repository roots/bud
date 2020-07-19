import {budPluginFactory} from '../plugin/budPluginFactory'

/**
 * ## bud.register
 *
 * Register a Bud plugin
 *
 * ```js
 * bud.register('myPlugin', myPlugin)
 * ```
 *
 * @typedef {function (name: string, plugin: function) => {bud: typeof import('./../index')}} register
 * @param   {boolean} enabled - true to enable hot module reloading. default: !bud.inProduction.
 * @return  {typeof import('./../index')} bud
 */
const register = function (name, plugin) {
  budPluginFactory(this).new(name, plugin).build()

  return this
}

export {register}
