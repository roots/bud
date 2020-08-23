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
exports.registerExtensionContainer = exports.registerFileContainer = exports.registerContainer = exports.container = void 0;
var fs_extra_1 = require("fs-extra");
var logger_1 = require("./util/logger");
var lodash_1 = require("lodash");
var newContainer = function (key, repository) {
    if (repository === void 0) { repository = {}; }
    this.repository[key] = new container(repository);
};
var add = function (entry) {
    this.repository.push(entry);
};
var get = function (key) {
    return lodash_1.get(this.repository, key);
};
var is = function (key, value) {
    return this.get(key) == value;
};
var containerRequire = function (key) {
    var module = this.get(key);
    require(module);
};
var set = function (key, value) {
    logger_1.logger.info({ name: 'container', key: key, value: value }, this.name + ".set");
    lodash_1.set(this.repository, key, value);
};
var has = function (key) {
    return this.repository.hasOwnProperty(key) ? true : false;
};
var merge = function (key, value) {
    this.repository[key] = this.repository[key]
        ? __assign(__assign({}, this.repository[key]), value) : this.repository[key]
        ? __spreadArrays(this.repository[key], value) : [this.repository[key], value];
};
var containerMethodDelete = function (key) {
    delete this.repository[key];
};
var exists = function (key) {
    return fs_extra_1.existsSync(this.repository[key]);
};
var enable = function (key) {
    logger_1.logger.info({ name: 'container', key: key, value: true }, this.name + ".enable");
    this.repository[key] = true;
};
var disable = function (key) {
    logger_1.logger.info({ name: 'container', key: key, value: false }, this.name + ".disable");
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
    instance.add = add;
    return instance;
};
exports.registerExtensionContainer = registerExtensionContainer;
//# sourceMappingURL=container.js.map