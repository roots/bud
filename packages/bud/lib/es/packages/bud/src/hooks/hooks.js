/**
 * @roots/bud v.2.0.0-rc.7 {@link https://roots.io/bud}
 *
 * A friendly build tool to help manage your project assets.
 *
 * Issues? {@link https://github.com/roots/bud/issues}
 *
 * Consider funding our work 🙏🏽 {@link https://github.com/sponsors/roots}
 *
 * @copyright 2020 Roots {@link https://roots.io}
 * @license MIT
 */
var hooks = function (logger) { return ({
    logger: logger,
    /**
     * Registered hooks.
     */
    registered: {},
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
            fired: false,
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
        this.logger.info({ name: name, callback: callback.name }, 'filter callback defined');
        if (!this.registered[name]) {
            this.registered[name] = [];
        }
        this.registered[name].push(callback);
        return this;
    },
    filter: function (name, value) {
        this.logger.info({ name: name, value: value }, name + " filter defined");
        if (!this.registered[name]) {
            return value;
        }
        this.registered[name].forEach(function (hook) {
            value = hook(value);
        });
        return value;
    },
}); };

export { hooks };
