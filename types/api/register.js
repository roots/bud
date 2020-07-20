"use strict";
exports.__esModule = true;
exports.register = void 0;
var pluginControllerFactory_1 = require("../plugin/pluginControllerFactory");
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
var register = function (name, plugin) {
    pluginControllerFactory_1.pluginControllerFactory(this)["new"](name, plugin).build();
    return this;
};
exports.register = register;
