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
 */
var register = function (name, plugin) {
    var bud = this;
    var registeredPlugin = [name, plugin];
    bud.plugin
        .controller(this)
        .initController(registeredPlugin)
        .buildPlugin();
    return this;
};
exports.register = register;
//# sourceMappingURL=register.js.map