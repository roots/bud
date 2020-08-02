"use strict";
exports.__esModule = true;
exports.hooks = void 0;
var hooks = function (logger) { return ({
    logger: logger,
    /**
     * Registered hooks.
     */
    registered: {},
    /**
     * Called hooks.
     */
    called: [],
    /**
     * Init hooks.
     */
    init: function (bud) {
        this.bud = bud;
        return this;
    },
    /**
     * Make a bud hook
     */
    make: function (fn) {
        if (fn === void 0) { fn = function () { return null; }; }
        return ({
            fn: fn,
            fired: false
        });
    },
    /**
     * Get all bud hook entries.
     */
    entries: function () {
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
    call: function (name, param) {
        var bud = this.bud;
        var logger = this.logger;
        this.called.push(name);
        if (this.registered[name]) {
            this.registered[name].forEach(function (hook) {
                logger.info(hook, "[action] [execute] " + name);
                param ? hook.fn(param, bud) : hook.fn(bud);
                hook.fired = true;
            });
        }
    },
    filter: function (name, value) {
        var logger = this.logger;
        this.called.push(name);
        if (this.registered[name]) {
            this.registered[name].forEach(function (hook) {
                var res = hook.fn(value);
                logger.info(hook, "[filter] [execute] " + hook.name);
                hook.fired = true;
            });
        }
        return value;
    }
}); };
exports.hooks = hooks;
//# sourceMappingURL=hooks.js.map