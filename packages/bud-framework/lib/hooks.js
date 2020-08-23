"use strict";
exports.__esModule = true;
exports.hooks = void 0;
var hooks = function (app) { return ({
    logger: app.logger,
    registered: {},
    make: function (fn) {
        if (fn === void 0) { fn = function () { return null; }; }
        return ({
            fn: fn,
            value: null,
            fired: false
        });
    },
    entries: function () {
        return Object.entries(this.registered);
    },
    on: function (name, callback) {
        this.logger.info({
            name: name,
            callback: callback.name
        }, 'filter defined');
        var entry = this.make(callback);
        if (!this.registered[name]) {
            this.registered[name] = [entry];
        }
        this.registered[name].push(callback);
        return this;
    },
    filter: function (name, value) {
        this.logger.info({ name: name, value: value }, name + " filter called");
        if (!this.registered[name]) {
            return value;
        }
        this.registered[name].map(function (hook) {
            value = hook.fn(value);
            return {
                name: hook.name,
                value: value,
                fired: true
            };
        });
        return value;
    }
}); };
exports.hooks = hooks;
//# sourceMappingURL=hooks.js.map