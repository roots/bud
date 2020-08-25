"use strict";
exports.__esModule = true;
exports.registerExtensionContainer = exports.registerFileContainer = exports.registerContainer = exports.container = void 0;
var fs_extra_1 = require("fs-extra");
var logger_1 = require("./util/logger");
var lodash_1 = require("lodash");
var newContainer = function (key, repository) {
    if (repository === void 0) { repository = {}; }
    this.repository[key] = new container(repository);
};
var push = function (item) {
    this.repository.push(item);
};
var get = function (key) {
    return lodash_1.get(this.repository, key);
};
var is = function (key, value) {
    return this.get(key) == value;
};
var containerRequire = function (key) {
    require(this.get(key));
};
var set = function (key, value) {
    logger_1.logger.info({ name: 'container', key: key, value: value }, this.name + ".set");
    lodash_1.set(this.repository, key, value);
};
var has = function (key) {
    return this.repository.hasOwnProperty(key) ? true : false;
};
var merge = function (value) {
    lodash_1.merge(this.repository, value);
};
var containerMethodDelete = function (key) {
    delete this.repository[key];
};
var exists = function (key) {
    return fs_extra_1.existsSync(this.repository[key]);
};
var enable = function (key) {
    this.repository[key] = true;
};
var disable = function (key) {
    this.repository[key] = false;
};
var enabled = function (key) {
    return this.is(key, true);
};
var disabled = function (key) {
    return this.is(key, false);
};
var map = function () {
    var _a;
    var params = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        params[_i] = arguments[_i];
    }
    return (_a = this.repository).map.apply(_a, params);
};
var entries = function () {
    return this.repository;
};
var container = function (repository, name) {
    if (name === void 0) { name = 'anonymous'; }
    this.name = name;
    this.repository = repository;
    this["new"] = newContainer;
    this.get = get;
    this.has = has;
    this.set = set;
    this.map = map;
    this.entries = entries;
    this.push = push;
    this.merge = merge;
    this["delete"] = containerMethodDelete;
    this.is = is;
    this.enable = enable;
    this.enabled = enabled;
    this.disable = disable;
    this.disabled = disabled;
};
exports.container = container;
/**
 * Bind container.
 */
var registerContainer = function (store) {
    return new container(store.register, store.name);
};
exports.registerContainer = registerContainer;
/**
 * Bind file container.
 */
var registerFileContainer = function (store) {
    var instance = new container(store.register, store.name);
    instance.require = containerRequire;
    instance.exists = exists;
    return instance;
};
exports.registerFileContainer = registerFileContainer;
/**
 * Bind extension container.
 */
var registerExtensionContainer = function (store) {
    var instance = new container(store.register, store.name);
    return instance;
};
exports.registerExtensionContainer = registerExtensionContainer;
//# sourceMappingURL=container.js.map