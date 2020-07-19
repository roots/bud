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
exports.budPluginFactory = void 0;
/**
 * Util
 * @typedef  {fab: { false: {function () => {boolean}} }} fab
 * @property {function () => {boolean}} false
 * @property {function () => {boolean}} true
 * @property {function () => {undefined}} undefined
 * @property {function () => {null}} null
 */
var fab = {
    "false": function () { return false; },
    "true": function () { return true; },
    undefined: function () { return undefined; },
    "null": function () { return null; }
};
/**
 * Bud plugin factory.
 *
 * @typedef {function () => {object}} budPluginFactory
 * @param   {bud}      bud
 * @return  {factory}
 */
var budPluginFactory = function (bud) {
    /**
     * Bud plugin factory.
     *
     * @typedef  {object} factory
     * @property {bud} bud
     * @property {new} new
     * @property {build} build
     * @property {bindPluginProps} bindPluginProps
     * @property {ensurePluginProp} ensurePluginProp
     * @property {instantiatePlugin} instantiatePlugin
     */
    var factory = {
        /**
         * @property {bud} bud - bud container
         */
        bud: bud,
        /**
         * Init plugin factory
         *
         * @typedef {function (name: string, plugin: object) => {factory}} new
         * @param   {string}  name
         * @param   {object}  plugin
         * @return  {factory} factory
         */
        "new": function (name, plugin) {
            this.name = name;
            this.plugin = plugin;
            return this;
        },
        /**
         * Build plugin.
         *
         * @typedef  {function () => void} build
         * @return   {void} void
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
         * @typedef {function () => {void}} bindPluginProps
         * @return   {void} void
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
            this.ensurePluginProp('options', fab.undefined());
            this.ensurePluginProp('mergeOptions', fab.undefined);
            this.doPluginHook('post_bind');
        },
        /**
         * Ensure plugin prop is set.
         *
         * @typedef {function (pluginProp: string, fallback: {any}) => {void}} ensurePluginProp
         * @param   {string} pluginProp - plugin property
         * @param   {any}    fallback - fallback value
         * @return  {void}
         */
        ensurePluginProp: function (pluginProp, fallback) {
            this.plugin[pluginProp] =
                this.plugin[pluginProp] || fallback;
        },
        /**
         * Instantiate plugin.
         *
         * @typedef {function () => {void}} instantiatePlugin
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
         * @typedef {function () => {void}} register
         */
        register: function () {
            this.doPluginHook('pre_register');
            this.plugin.register && this.plugin.register();
            this.doPluginHook('post_register');
        },
        /**
         * Merge plugin options.
         *
         * @typedef {function () => {void}} mergePluginOptions
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
    };
    return factory;
};
exports.budPluginFactory = budPluginFactory;
