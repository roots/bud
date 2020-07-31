"use strict";
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.controller = void 0;
/**
 * Plugin controller.
 *
 * @param {Bud} bud
 * @return {Controller}
 * @this {Bud}
 */
var controller = function (bud) { return ({
    bud: bud,
    initController: function (_a) {
        var name = _a.name, extension = _a.extension;
        this.name = name;
        this.plugin = extension;
        return this;
    },
    /**
     * Build plugin.
     */
    buildPlugin: function () {
        this.initPlugin();
        this.bindPluginProps();
        this.setPluginOptions();
        this.mergePluginOptions();
        return this.makePlugin();
    },
    /**
     * Initialize plugin.
     * @property {function} initPlugin
     * @return   {void}
     */
    initPlugin: function () {
        this.doPluginHook('pre_init');
        this.plugin = this.plugin(this.bud);
        this.doPluginHook('post_init');
    },
    /**
     * Bind plugin props.
     * @property {function} bindProps
     * @return   {void}
     */
    bindPluginProps: function () {
        this.doPluginHook('pre_bind');
        this.ensurePluginProp('bud', this.bud);
        this.ensurePluginProp('options', this.bud.util.fab.undefined());
        this.ensurePluginProp('setOptions', this.bud.util.fab.undefined);
        this.ensurePluginProp('mergeOptions', this.bud.util.fab.undefined);
        this.ensurePluginProp('when', this.bud.util.fab["true"]);
        this.doPluginHook('post_bind');
    },
    /**
     * Ensure plugin prop is set.
     * @property {function} ensurePluginProp
     * @param    {string} prop - plugin property
     * @param    {any} fallback - fallback value
     * @return   {void}
     */
    ensurePluginProp: function (prop, fallback) {
        this.plugin[prop] = this.plugin[prop] || fallback;
    },
    /**
     * Set plugin options.
     * @property {function} setPluginOptions
     * @return   {void}
     */
    setPluginOptions: function () {
        this.doPluginHook('pre_options');
        this.boundValue = this.plugin.setOptions();
        if (this.boundValue) {
            this.doPluginHook('options', this.boundValue);
            this.plugin.options = this.boundValue;
        }
        delete this.boundValue;
        this.doPluginHook('post_options');
    },
    /**
     * Set plugin options.
     * @property {function} setPluginOptions
     * @return   {void}
     */
    mergePluginOptions: function () {
        this.doPluginHook('pre_merge');
        this.boundValue = this.plugin.mergeOptions();
        if (this.boundValue) {
            this.doPluginHook('merge', this.boundValue);
            this.plugin.options = __assign(__assign({}, this.plugin.options), this.boundValue);
        }
        delete this.boundValue;
        this.doPluginHook('post_merge');
    },
    /**
     * Make plugin.
     * @property {function} makePlugin
     * @return   {object} constructed webpack plugin
     */
    makePlugin: function () {
        this.doPluginHook('pre');
        this.plugin =
            this.plugin.when() && this.plugin.make
                ? this.plugin.make()
                : this.bud.util.fab.undefined();
        this.doPluginHook('post');
        if (this.plugin) {
            return this.plugin;
        }
    },
    /**
     * Do plugin hook.
     * @property {function} doPluginHook
     * @return   {void}
     */
    doPluginHook: function (hook) {
        var _a;
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        (_a = this.bud.hooks).call.apply(_a, __spreadArrays([hook + "_" + this.name, this.plugin], params));
    }
}); };
exports.controller = controller;
//# sourceMappingURL=controller.js.map