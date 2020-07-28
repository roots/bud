"use strict";
exports.__esModule = true;
exports.plugin = void 0;
/**
 * ## plugin.register
 *
 * Register a plugin
 *
 * ```js
 * bud.plugin.register('myPlugin', myPlugin)
 * ```
 */
var register = function (name, plugin) {
    var registeredPlugin = [name, plugin];
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
var deregister = function (name) {
    delete (this.repo[0][name]);
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
var all = function () {
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
var get = function (name) {
    return this.repo[name];
};
/**
 * ## plugin
 *
 * ```
 * js.plugin()
 * ```
 */
var plugin = function () {
    return {
        core: {
            repo: this.state.plugins.registered,
            register: register,
            deregister: deregister,
            get: get,
            all: all
        },
        webpack: {
            repo: this.state.plugins.adapters,
            register: register,
            deregister: deregister,
            get: get,
            all: all
        }
    };
};
exports.plugin = plugin;
//# sourceMappingURL=plugin.js.map