"use strict";
exports.__esModule = true;
exports.hooks = void 0;
var hooks = function (app) { return ({
    logger: app.logger,
    registered: {},
    make: function (fn) { return ({
        fn: fn,
        fired: false
    }); },
    entries: function () {
        return Object.entries(this.registered);
    },
    on: function (name, callback) {
        this.logger.info({ name: name, callback: callback.name });
        var entry = this.make(callback);
        if (!this.registered[name]) {
            this.registered[name] = [entry];
        }
        else {
            this.registered[name].push(entry);
        }
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
                fired: true
            };
        });
        return value;
    }
}); };
exports.hooks = hooks;
//# sourceMappingURL=hooks.js.map