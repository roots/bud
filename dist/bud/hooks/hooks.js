"use strict";
exports.__esModule = true;
exports.hooks = void 0;
/**
 * ## bud.hooks
 *
 * Register callback.
 *
 * ```js
 * bud.hooks.on('hookName', function(value) {
 *   doSomething(value)
 * })}
 * ```
 *
 * Invoke registered callback(s)
 *
 * ```js
 * bud.hooks.call('hookName', value)
 * ```
 */
var hooks = {
    /**
     * Registered hooks.
     */
    registered: {},
    /**
     * Make a bud hook
     */
    make: function (fn) {
        if (fn === void 0) { fn = function () { return null; }; }
        return ({ fn: fn, fired: false });
    },
    /**
     * Get all bud hook entries.
     */
    getAll: function () {
        return Object.entries(this.registered);
    },
    /**
     * Register a function as a bud hook.
     */
    on: function (name, callback) {
        if (!this.registered[name]) {
            this.registered[name] = [];
        }
        this.registered[name].push(this.make(callback));
        return this;
    },
    /**
     * Call a bud hook.
     */
    call: function (name) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        if (this.registered[name]) {
            this.registered[name].forEach(function (hook) {
                hook.fn.apply(hook, params);
                hook.fired = true;
            });
        }
    }
};
exports.hooks = hooks;
//# sourceMappingURL=hooks.js.map