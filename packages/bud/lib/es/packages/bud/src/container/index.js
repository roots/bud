/**
 * @roots/bud v.2.0.0-rc.7 {@link https://roots.io/bud}
 *
 * A friendly build tool to help manage your project assets.
 *
 * Issues? {@link https://github.com/roots/bud/issues}
 *
 * Consider funding our work 🙏🏽 {@link https://github.com/sponsors/roots}
 *
 * @copyright 2020 Roots {@link https://roots.io}
 * @license MIT
 */
import { __assign, __spreadArrays } from 'tslib';
import { existsSync } from 'fs-extra';
import { logger } from '../util/logger.js';
import { controller } from '../repositories/adapters/controller.js';
import { get as get$1, set as set$1 } from 'lodash';

var log = function (repository, data, message) {
    logger.info(__assign({ name: 'container', repository: repository }, (data || {})), message);
};
var newContainer = function (key, repository) {
    if (repository === void 0) { repository = {}; }
    this.repository[key] = new container(repository);
};
var add = function (entry) {
    this.repository.push(entry);
};
var get = function (key) {
    return get$1(this.repository, key);
};
var is = function (key, value) {
    return this.get(key) == value;
};
var containerRequire = function (key) {
    var module = this.get(key);
    require(module);
};
var set = function (key, value) {
    logger.info({ name: 'container', key: key, value: value }, this.name + ".set");
    set$1(this.repository, key, value);
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
    return existsSync(this.repository[key]);
};
var enable = function (key) {
    logger.info({ name: 'container', key: key, value: true }, this.name + ".enable");
    this.repository[key] = true;
};
var disable = function (key) {
    logger.info({ name: 'container', key: key, value: false }, this.name + ".disable");
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
/**
 * Bind container.
 */
var bindContainer = function (repository, name) {
    if (name === void 0) { name = 'anonymous'; }
    log(repository, { repository: name }, "create container");
    return new container(repository, name);
};
/**
 * Bind file container.
 */
var bindFileContainer = function (repository, name) {
    if (name === void 0) { name = 'anonymous'; }
    log(repository, { repository: name }, "create container");
    var store = new container(repository, name);
    store.require = containerRequire;
    store.exists = exists;
    return store;
};
/**
 * Bind extension container.
 */
var bindExtensionContainer = function (repository, name) {
    if (name === void 0) { name = 'anonymous'; }
    log(repository, { repository: name }, "create extension api container");
    var store = new container(repository, name);
    store.controller = controller;
    store.add = add;
    return store;
};

export { bindContainer, bindExtensionContainer, bindFileContainer, container };
