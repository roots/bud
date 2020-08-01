"use strict";
exports.__esModule = true;
exports.hooks = void 0;
var hooks = function () { return ({
    /**
     * Registered hooks.
     */
    registered: {},
    /**
     * Called hooks.
     */
    called: [],
    /**
     * Log.
     */
    log: [],
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
     * Get all log entries
     */
    logEntries: function () {
        return this.log;
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
        var log = this.log;
        this.called.push(name);
        if (this.registered[name]) {
            this.registered[name].forEach(function (hook) {
                if (param) {
                    log.push({
                        type: 'call',
                        name: hook.name,
                        results: hook.fn(param, bud)
                    });
                }
                else {
                    log.push({
                        type: 'call',
                        name: hook.name,
                        results: hook.fn(bud)
                    });
                }
                hook.fired = true;
            });
        }
    },
    filter: function (name, value) {
        var bud = this.bud;
        var log = this.log;
        this.called.push(name);
        if (this.registered[name]) {
            this.registered[name].forEach(function (hook) {
                value = hook.fn(value, bud);
                log.push({
                    type: 'filter',
                    name: hook.name,
                    value: value
                });
                hook.fired = true;
            });
        }
        return value;
    }
}); };
exports.hooks = hooks;
//# sourceMappingURL=hooks.js.map