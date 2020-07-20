"use strict";
exports.__esModule = true;
exports.hooks = void 0;
/**
 * Hooks
 */
var hooks = {
    registered: {},
    /**
     * Make
     * @property {function} make
     */
    make: function (fn) {
        if (fn === void 0) { fn = function () { return null; }; }
        return ({ fn: fn, fired: false });
    },
    /**
     * Get all
     * @property {function} getAll
     */
    getAll: function () {
        return Object.entries(this.registered);
    },
    /**
     * On
     * @typedef {function (name: string, callback: function): void} add
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
     * @typedef {function (name: string, callback: function): void} call
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
