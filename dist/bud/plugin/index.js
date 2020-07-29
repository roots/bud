"use strict";
exports.__esModule = true;
exports.plugin = void 0;
var controller_1 = require("./controller");
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
var register = function (name, plugin) {
    var registeredPlugin = [name, plugin];
    this.repo.push(registeredPlugin);
    return this.bud;
};
/**
 * Deregister a plugin
 */
var deregister = function (name) {
    delete this.repo[0][name];
    return this.bud;
};
/**
 * Get all registered plugins
 */
var all = function () {
    return this.repo;
};
/**
 * get plugin
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
 * ```js
 * bud.plugin.init
 * ```
 */
var plugin = {
    init: function (bud) {
        this.bud = bud;
        this.controller = controller_1.controller(bud);
        this.core = makePluginApi(bud, this.bud.state.plugins.registered);
        this.webpack = makePluginApi(bud, this.bud.state.plugins.adapters);
        return this;
    }
};
exports.plugin = plugin;
//# sourceMappingURL=index.js.map