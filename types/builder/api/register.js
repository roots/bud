"use strict";
exports.__esModule = true;
exports.register = void 0;
/**
 * ## bud.register
 *
 * Register a Bud plugin
 *
 * ```js
 * bud.register('myPlugin', myPlugin)
 * ```
 *
 * @param   {boolean} enabled - true to enable hot module reloading. default: !bud.inProduction.
 * @return  {typeof import('./../index')} bud
 */
var register = function (name, plugin) {
    budPluginFactory(this)["new"](name, plugin).build();
    return this;
};
exports.register = register;
