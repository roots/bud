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
 *
 * @type {Hooks}
 * @property {Hooks.registered} registered
 * @property {Hooks.make} make - make a hook
 * @property {Hooks.getAll} getAll - return all hooks
 * @property {Hooks.on} on - Register hook
 * @property {Hooks.call} call - Call a hook
 */
var hooks = {
    /**
     * Registered hooks.
     * @property {Hooks.registered} registered
     */
    registered: {},
    /**
     * Make
     * @property {Hooks.make} make
     */
    make: function (fn) {
        if (fn === void 0) { fn = function () { return null; }; }
        return ({ fn: fn, fired: false });
    },
    /**
     * Get all
     * @property {Hooks.getAll} getAll
     */
    getAll: function () {
        return Object.entries(this.registered);
    },
    /**
     * On
     * @property {Hooks.on} on
     */
    on: function (name, callback) {
        if (!this.registered[name]) {
            this.registered[name] = [];
        }
        this.registered[name].push(this.make(callback));
        return this;
    },
    /**
     * Call
     * @property {Hooks.call} call
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
