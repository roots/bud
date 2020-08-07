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
        this.registered[name].push(callback);
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
                param ? hook(param, bud) : hook.fn(bud);
            });
        }
    },
    filter: function (name, value) {
        var logger = this.logger;
        this.called.push(name);
        if (!this.registered[name]) {
            return value;
        }
        this.registered[name].forEach(function (hook) {
            value = hook(value);
        });
        return value;
    }
}); };
export { hooks };
//# sourceMappingURL=hooks.js.map