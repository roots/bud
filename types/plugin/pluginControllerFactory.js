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
exports.pluginControllerFactory = void 0;
var fab_1 = require("./../util/fab");
/**
 * Bud plugin controller factory.
 *
 * @param   {bud}      bud
 * @return  {BudPluginController}
 */
var pluginControllerFactory = function (bud) { return ({
    /**
     * @property {BudPluginController.bud}
     */
    bud: bud,
    /**
     * Initialize controller.
     *
     * @property {BudPluginController.new}
     * @return   {BudPluginController}
     */
    "new": function (name, plugin) {
        this.name = name;
        this.plugin = plugin;
        return this;
    },
    /**
     * Build plugin.
     *
     * @property {BudPluginController.build}
     * @return {void}
     */
    build: function () {
        this.instantiatePlugin();
        this.bindPluginProps();
        this.mergePluginOptions();
        this.register();
    },
    /**
     * Bind plugin props.
     *
     * @property {BudPluginController.bindPluginProps}
     * @return   {void}
     */
    bindPluginProps: function () {
        var _this = this;
        this.doPluginHook('pre_bind');
        this.ensurePluginProp('bud', this.bud);
        this.ensurePluginProp('on', function (name, fn) {
            return _this.bud.hooks.on(name, fn);
        });
        this.ensurePluginProp('call', function (name, params) {
            return _this.bud.hooks.call(name, params);
        });
        this.ensurePluginProp('options', fab_1.fab.undefined());
        this.ensurePluginProp('mergeOptions', fab_1.fab.undefined);
        this.doPluginHook('post_bind');
    },
    /**
     * Ensure plugin prop is set.
     *
     * @property {BudPluginController.ensurePluginProp}
     * @param    {string} pluginProp - plugin property
     * @param    {any} fallback - fallback value
     * @return   {void}
     */
    ensurePluginProp: function (pluginProp, fallback) {
        this.plugin[pluginProp] = this.plugin[pluginProp] || fallback;
    },
    /**
     * Instantiate plugin.
     *
     * @typedef {BudPluginController.instantiatePlugin}
     * @return  {void}
     */
    instantiatePlugin: function () {
        this.doPluginHook('pre_init');
        this.plugin = this.plugin(this.bud);
        this.doPluginHook('post_init');
    },
    /**
     * Register plugin callbacks.
     *
     * @typedef {BudPluginController.register} register
     */
    register: function () {
        this.doPluginHook('pre_register');
        this.plugin.register && this.plugin.register();
        this.doPluginHook('post_register');
    },
    /**
     * Merge plugin options.
     *
     * @typedef {BudPluginController.mergePluginOptions}
     * @return  {void}
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
     * Do plugin hook.
     *
     * @property {function} doPluginHook
     * @return   {void}
     */
    doPluginHook: function (hook) {
        var _a;
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        (_a = this.bud.hooks).call.apply(_a, __spreadArrays([hook + "_bud_plugin_" + this.name, this.plugin], params));
    }
}); };
exports.pluginControllerFactory = pluginControllerFactory;
