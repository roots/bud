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
exports.webpackPluginFactory = void 0;
var fab_1 = require("../util/fab");
/**
 * Plugin controller
 *
 * @type    {function} webpackPluginFactory
 * @param   {array}
 */
var webpackPluginFactory = function (_a, bud) {
    var name = _a[0], plugin = _a[1];
    return ({
        /**
         * Bud container.
         * @property {bud} bud
         */
        bud: bud,
        /**
         * Plugin name.
         *
         * @property {string} name
         */
        name: name,
        /**
         * Plugin instance.
         * @property {object} plugin
         */
        plugin: plugin,
        /**
         * Build plugin.
         *
         * @property {function} build
         * @return   {Object}
         */
        build: function () {
            this.initPlugin();
            this.bindPluginProps();
            this.setPluginOptions();
            this.mergePluginOptions();
            return this.makePlugin();
        },
        /**
         * Bind plugin props.
         *
         * @property {function} bindPluginProps
         * @return   {void}
         */
        bindPluginProps: function () {
            this.doPluginHook('pre_bind');
            this.ensurePluginProp('bud', this.bud);
            this.ensurePluginProp('options', fab_1.fab.undefined());
            this.ensurePluginProp('setOptions', fab_1.fab.undefined);
            this.ensurePluginProp('mergeOptions', fab_1.fab.undefined);
            this.ensurePluginProp('when', fab_1.fab["true"]);
            this.doPluginHook('post_bind');
        },
        /**
         * Ensure plugin prop is set.
         *
         * @property {function} ensurePluginProp
         * @param    {string} prop - plugin property
         * @param    {any} fallback - fallback value
         * @return   {void}
         */
        ensurePluginProp: function (prop, fallback) {
            this.plugin[prop] = this.plugin[prop] || fallback;
        },
        /**
         * Initialize plugin.
         *
         * @property {function} initPlugin
         * @return   {void}
         */
        initPlugin: function () {
            this.doPluginHook('pre_init');
            this.plugin = this.plugin(this.bud);
            this.doPluginHook('post_init');
        },
        /**
         * Set plugin options.
         *
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
         *
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
         *
         * @property {function} makePlugin
         * @return   {object} constructed webpack plugin
         */
        makePlugin: function () {
            this.doPluginHook('pre');
            this.plugin = this.plugin.when()
                ? this.plugin.make()
                : fab_1.fab.undefined();
            this.doPluginHook('post');
            return this.plugin;
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
            (_a = this.bud.hooks).call.apply(_a, __spreadArrays([hook + "_" + this.name, this.plugin], params));
        }
    });
};
exports.webpackPluginFactory = webpackPluginFactory;
