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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.dependencyManifest = void 0;
/**
 * Make a manifest of @wordpress dependencies utilized by entrypoints.
 * @see     https://git.io/JJLxM
 * @example bud.dependencyManifest({outputFormat: 'js', injectPolyfill: false})
 * @param   {{enabled?: boolean, outputFormat: string, combineAssets: boolean, combinedOutputFile: string, useDefaults: boolean, injectPolyfill: boolean, requestToExternal: Function, requestToHandle: Function}} settings
 * @param   {string}  settings.outputFormat - either 'php' or 'js'
 * @param   {boolean} settings.combineAssets - By default, one manifest is created for each entry point. When this flag is set to true, all information about assets is combined into a single manifest.
 * @param   {string}  settings.combinedOutputFile - This option is useful only when the combineAssets option is enabled. It allows providing a custom output file for the generated manifest.
 * @param   {boolean} settings.useDefaults - Set to false to disable the default WP request handling.
 * @param   {boolean} settings.injectPolyfill - Force @wordpress/polyfill to be included in each entry point's dependency list.
 * @param   {Function} settings.requestToExternal - requestToExternal provided via configuration has precedence over default external handling.
 * @param   {Function} settings.requestToHandle - requestToHandle allows the script handle included in the dependency list to be customized.
 * @return  {typeof import('./../index')} bud
 */
var dependencyManifest = function (_a) {
    var settings = __rest(_a, []);
    this.features.dependencyManifest = true;
    this.features.dependencyManifest &&
        Object.assign(this.options.dependencyManifest, __assign(__assign({}, this.options.dependencyManifest), (settings ? settings : {})));
    return this;
};
exports.dependencyManifest = dependencyManifest;
