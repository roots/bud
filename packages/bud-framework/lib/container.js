"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.registerPluginContainer = exports.registerFileContainer = exports.registerContainer = exports.container = void 0;
var fs_extra_1 = require("fs-extra");
var lodash_1 = __importDefault(require("lodash"));
var newContainer = function (key, repository) {
    if (repository === void 0) { repository = {}; }
    this.repository[key] = new container(repository);
};
var addTo = function (key, item) {
    this.repository[key].push(item);
};
var push = function (item) {
    this.repository.push(item);
};
var get = function (key) {
    return lodash_1["default"].get(this.repository, key);
};
var is = function (key, value) {
    return this.get(key) == value;
};
var containerRequire = function (key) {
    require(this.get(key));
};
var set = function (key, value) {
    lodash_1["default"].set(this.repository, key, value);
};
var has = function (key) {
    return this.repository.hasOwnProperty(key) ? true : false;
};
var merge = function (key, value) {
    this.set(key, lodash_1["default"].merge(this.get(key), value));
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
    return Object.entries(this.repository);
};
var container = function (repository, name) {
    if (name === void 0) { name = 'anonymous'; }
    this.name = name;
    this.repository = repository;
    this["new"] = newContainer;
    this.addTo = addTo;
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
var registerPluginContainer = function (store) {
    var instance = new container(store.register, store.name);
    return instance;
};
exports.registerPluginContainer = registerPluginContainer;
//# sourceMappingURL=container.js.map