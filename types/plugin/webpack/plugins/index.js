"use strict";
exports.__esModule = true;
exports.plugins = void 0;
/** webpack plugin factory */
var webpackPluginFactory_1 = require("./webpackPluginFactory");
/**
 * Webpack plugins.
 *
 * @constructor
 * @type {function (bud) => {object}} plugins
 * @returns {object}
 */
var plugins = function (bud) { return ({
    /**
     * Bud container.
     * @property {bud} bud
     */
    bud: bud,
    /**
     * Webpack plugins
     * @property {array} pluginQueue
     */
    pluginQueue: bud.webpackPlugins,
    /**
     * Make plugins.
     *
     * @property {function} make
     * @return   {Object}
     */
    make: function () {
        var _this = this;
        this.doHook('pre');
        this.plugins = this.pluginQueue
            .map(function (plugin) {
            return webpackPluginFactory_1.webpackPluginFactory(plugin, _this.bud).build();
        })
            .filter(function (plugin) { return plugin !== undefined; });
        this.doHook('post');
        return {
            plugins: this.plugins
        };
    },
    /**
     * Call a bud hook
     *
     * @property {function} doPreHook
     * @param    {string} name
     * @return   {void}
     */
    doHook: function (name) {
        this.bud.hooks.call(name + "_webpack_plugins", this.plugins, this.bud);
    }
}); };
exports.plugins = plugins;
