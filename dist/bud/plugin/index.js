"use strict";
exports.__esModule = true;
exports.plugin = void 0;
var controller_1 = require("./controller");
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
var makePluginApi = function (bud, repo) { return ({
    repo: repo,
    register: register,
    deregister: deregister,
    get: get,
    all: all
}); };
/**
 * ## plugin
 *
 * ```
 * js.plugin
 * ```
 */
var plugin = {
    init: function (bud) {
        this.bud = bud;
        this.controller = controller_1.controller(bud);
        this.core = makePluginApi(bud, this.bud.state.plugins.registered);
        this.webpack = makePluginApi(bud, this.bud.state.plugins.adapters);
    }
};
exports.plugin = plugin;
//# sourceMappingURL=index.js.map