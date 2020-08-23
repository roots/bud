"use strict";
exports.__esModule = true;
exports.bootstrap = void 0;
var hooks_1 = require("./hooks");
var util_1 = require("./util");
var extensions_1 = require("./extensions");
var container_1 = require("./container");
/**
 * Bootstrap
 */
var bootstrap = function () {
    this.hooks = hooks_1.hooks;
    this.util = util_1.util;
    this.extensions = extensions_1.extensions;
    this.logger = util_1.logger;
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
    this.bindExtensions = function (name, store) {
        if (store === void 0) { store = {}; }
        this[name] = container_1.registerExtensionContainer(store);
        return this[name];
    };
};
exports.bootstrap = bootstrap;
//# sourceMappingURL=bootstrap.js.map