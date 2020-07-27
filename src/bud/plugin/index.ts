import { controller } from "./controller";
import { Bud } from "./types";

/**
 * ## plugin.register
 *
 * Register a plugin
 *
 * ```js
 * bud.plugin.register('myPlugin', myPlugin)
 * ```
 */
const register = function (name: string, plugin: any) {
  const registeredPlugin = [name, plugin];
  this.repo.push(registeredPlugin);

  return this.bud;
};

/**
 * ## plugin.deregister
 *
 * Deregister a plugin
 *
 * ```js
 * bud.plugin.deregister('myPlugin')
 * ```
 */
const deregister = function (name: string) {
  delete this.repo[0][name];
  return this.bud;
};

/**
 * ## plugin.all
 *
 * Get all registered plugins
 *
 * ```js
 * bud.plugin.all()
 * ```
 */
const all = function () {
  return this.repo;
};

/**
 * ## plugin.get
 *
 * Get a plugin
 *
 * ```js
 * bud.plugin.get('myPlugin')
 * ```
 */
const get = function (name: string) {
  return this.repo[name];
};

const makePluginApi = (bud, repo) => ({
  repo,
  register,
  deregister,
  get,
  all,
});

/**
 * ## plugin
 *
 * ```
 * js.plugin
 * ```
 */
const plugin = {
  init: function (bud: Bud) {
    this.bud = bud;
    this.controller = controller(bud);
    this.core = makePluginApi(bud, this.bud.state.plugins.registered);
    this.webpack = makePluginApi(bud, this.bud.state.plugins.adapters);
  },
};
/**
 * bud.plugin export
 */
export { plugin };
