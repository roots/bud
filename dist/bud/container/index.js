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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.fileContainer = exports.container = void 0;
var fs_extra_1 = require("fs-extra");
var path_1 = __importDefault(require("path"));
var fs = {
    path: path_1["default"],
    existsSync: fs_extra_1.existsSync
};
var newContainer = function (key, repository) {
    if (repository === void 0) { repository = {}; }
    this.repository[key] = repository
        ? new container({})
        : new container([]);
};
var get = function (key) {
    return this.repository[key];
};
var is = function (key, value) {
    return this.get(key) == value;
};
var contents = function (key) {
    return require(this.get(key));
};
var set = function (key, value) {
    this.repository[key] = value;
};
var has = function (key) {
    return this.repository[key] && this.repository[key] !== null;
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
    return this.fs.existsSync(key);
};
var enable = function (key) {
    this.set(key, true);
};
var disable = function (key) {
    this.set(key, false);
};
var enabled = function (key) {
    return this.is(key, true);
};
var disabled = function (key) {
    return this.is(key, false);
};
var container = function (repository) {
    this.repository = repository;
    this["new"] = newContainer;
    this.get = get;
    this.contents = contents;
    this.set = set;
    this.merge = merge;
    this["delete"] = containerMethodDelete;
    this.has = has;
    this.is = is;
    this.enable = enable;
    this.enabled = enabled;
    this.disable = disable;
    this.disabled = disabled;
};
exports.container = container;
container.prototype.fs = fs;
var fileContainer = function (repository) {
    this.repository = repository;
    this.fs = fs;
    this["new"] = newContainer;
    this.get = get;
    this.contents = contents;
    this.set = set;
    this.merge = merge;
    this["delete"] = containerMethodDelete;
    this.has = has;
    this.exists = exists;
    this.is = is;
    this.enable = enable;
    this.enabled = enabled;
    this.disable = disable;
    this.disabled = disabled;
};
exports.fileContainer = fileContainer;
//# sourceMappingURL=index.js.map