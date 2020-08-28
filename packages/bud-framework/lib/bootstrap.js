"use strict";
exports.__esModule = true;
exports.bootstrap = void 0;
var hooks_1 = require("./hooks");
var util_1 = require("./util");
var pluginControllerFactory_1 = require("./pluginControllerFactory");
var container_1 = require("./container");
/**
 * Error on unhandled rejections.
 */
process.on('unhandledRejection', function (error) {
    process.exitCode = 1;
    process.nextTick(function () {
        console.error(error);
        util_1.util.terminate();
    });
});
/**
 * Bootstrap
 */
var bootstrap = function () {
    this.hooks = hooks_1.hooks;
    this.util = util_1.util;
    this.pluginController = pluginControllerFactory_1.pluginController;
    this.logger = util_1.util.logger;
    this.apply = function (binding, value) {
        this[binding] = value;
        return this;
    };
    this.bind = function (name, store) {
        if (store === void 0) { store = {}; }
        this[name] = container_1.registerContainer(store);
        return this[name];
    };
    this.bindFiles = function (name, store) {
        if (store === void 0) { store = {}; }
        this[name] = container_1.registerFileContainer(store);
        return this[name];
    };
    this.bindPlugins = function (name, store) {
        if (store === void 0) { store = {}; }
        this[name] = container_1.registerPluginContainer(store);
        return this[name];
    };
};
exports.bootstrap = bootstrap;
//# sourceMappingURL=bootstrap.js.map