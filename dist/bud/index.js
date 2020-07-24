"use strict";
exports.__esModule = true;
exports.bud = void 0;
var api_1 = require("./api");
var hooks_1 = require("./hooks");
var util_1 = require("./util");
var plugin_1 = require("./plugin");
var state_1 = require("./state");
var mode_1 = require("./mode");
/**
 * Bud - asset management framework.
 */
var bud = {
    hooks: hooks_1.hooks,
    util: util_1.util,
    plugin: plugin_1.plugin,
    state: state_1.state,
    mode: mode_1.mode,
    inProduction: mode_1.inProduction,
    alias: api_1.api.alias,
    auto: api_1.api.auto,
    babel: api_1.api.babel,
    bundle: api_1.api.bundle,
    copy: api_1.api.copy,
    copyAll: api_1.api.copyAll,
    dashboard: api_1.api.dashboard,
    dist: api_1.api.dist,
    distPath: api_1.api.distPath,
    debug: api_1.api.debug,
    dependencyManifest: api_1.api.dependencyManifest,
    dev: api_1.api.dev,
    devtool: api_1.api.devtool,
    env: api_1.api.env,
    hash: api_1.api.hash,
    inlineManifest: api_1.api.inlineManifest,
    map: api_1.api.map,
    mini: api_1.api.mini,
    postCss: api_1.api.postCss,
    preset: api_1.api.preset,
    project: api_1.api.project,
    purge: api_1.api.purge,
    resolve: api_1.api.resolve,
    register: api_1.api.register,
    src: api_1.api.src,
    srcPath: api_1.api.srcPath,
    sync: api_1.api.sync,
    target: api_1.api.target,
    translate: api_1.api.translate,
    vendor: api_1.api.vendor,
    watch: api_1.api.watch
};
exports.bud = bud;
//# sourceMappingURL=index.js.map