import {controller} from './controller'
import {Bud} from './types'

/**
 * @todo this is duplicative and competes with bud.state.plugin.
 * Only one is needed.
 *
 * The nice thing about this system is it separates webpack
 * plugins from bud plugins, but also ensures that they keep
 * the same API.
 *
 * I think the best thing to do is implement or import this system
 * in the bud.state.plugin obj.
 */

/**
 * Register a plugin.
 */
const register = function (name: string, plugin: any) {
  const registeredPlugin = [name, plugin]
  this.repo.push(registeredPlugin)

  return this.bud
}

/**
 * Deregister a plugin
 */
const deregister = function (name: string) {
  delete this.repo[0][name]
  return this.bud
}

/**
 * Get all registered plugins
 */
const all = function () {
  return this.repo
}

/**
 * get plugin
 */
const get = function (name: string) {
  return this.repo[name]
}


const makePluginApi = (bud: Bud, repo) => ({
  repo,
  register,
  deregister,
  get,
  all,
})

/**
 * ## plugin
 *
 * ```js
 * bud.plugin.init
 * ```
 */
const plugin = {
  init: function (bud: Bud) {
    this.bud = bud
    this.controller = controller(bud)
    this.core = makePluginApi(bud, this.bud.state.plugins.registered)
    this.webpack = makePluginApi(bud, this.bud.state.plugins.adapters)

    return this
  },
}
/**
 * bud.plugin export
 */
export {plugin}
