import {pluginControllerFactory} from '../base/plugins/budPluginControllerFactory'

/**
 * ## bud.register
 *
 * Register a Bud plugin
 *
 * ```js
 * bud.register('myPlugin', myPlugin)
 * ```
 *
 * @type  {Register}
 * @param {string} name - The plugin name
 * @param {any} plugin  - The plugin object
 */
const register: Register = function (
  name: string,
  plugin: any,
) {
  pluginControllerFactory(this).new(name, plugin).build()

  return this
}

export {register}

import type {bud} from '..'
export type Register = (name: string, plugin: any) => bud
