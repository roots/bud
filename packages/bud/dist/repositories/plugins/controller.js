var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
/**
 * Plugin controller.
 *
 * @this {Bud}
 */
var controller = function (bud) { return ({
    bud: bud,
    /**
     * Build plugin.
     */
    build: function (extension) {
        this.plugin = extension();
        this.bindPluginProps();
        this.setPluginOptions();
        this.mergePluginOptions();
        return this.makePlugin();
    },
    /**
     * Bind plugin props
     */
    bindPluginProps: function () {
        this.ensurePluginProp('bud', this.bud);
        this.ensurePluginProp('options', this.bud.util.fab.undefined());
        this.ensurePluginProp('setOptions', this.bud.util.fab.undefined);
        this.ensurePluginProp('mergeOptions', this.bud.util.fab.undefined);
        this.ensurePluginProp('when', this.bud.util.fab["true"]);
    },
    /**
     * Ensure plugin prop is set.
     */
    ensurePluginProp: function (prop, fallback) {
        this.plugin[prop] = this.plugin[prop] || fallback;
    },
    /**
     * Set plugin options.
     */
    setPluginOptions: function () {
        this.boundValue = this.plugin.setOptions();
        if (this.boundValue) {
            this.plugin.options = this.boundValue;
        }
        delete this.boundValue;
    },
    /**
     * Merge plugin options.
     */
    mergePluginOptions: function () {
        this.boundValue = this.plugin.mergeOptions();
        if (this.boundValue) {
            this.plugin.options = __assign(__assign({}, this.plugin.options), this.boundValue);
        }
        delete this.boundValue;
    },
    /**
     * Make plugin.
     */
    makePlugin: function () {
        this.plugin =
            this.plugin.when() && this.plugin.make
                ? this.plugin.make(this.bud)
                : this.bud.util.fab.undefined();
        if (this.plugin) {
            return this.plugin;
        }
    }
}); };
export { controller };
//# sourceMappingURL=controller.js.map