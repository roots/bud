"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
exports.__esModule = true;
exports.configs = exports.bud = void 0;
__exportStar(require("./bud/api/types"), exports);
/**
 * ## Bud - asset management framework.
 *
 * @const {Bud} bud
 */
var bud_1 = require("./bud");
/**
 * Initialize Bud.
 */
var init = function () {
    /**
     * Constructor
     */
    var bud = new bud_1.framework();
    /**
     * Action: extensions_init
     */
    bud.hooks.on('filter_adapters_init', function (extensions, bud) {
        return extensions.map(function (_a) {
            var name = _a.name, extension = _a.extension;
            return ({
                name: name,
                extension: bud.plugins
                    .controller(bud)
                    .initController({ name: name, extension: extension })
            });
        });
    });
    /**
     * Action: extensions_build
     */
    bud.hooks.on('filter_adapters_build', function (extensions) {
        return extensions.map(function (_a) {
            var name = _a.name, extension = _a.extension;
            return ({
                name: name,
                extension: extension.buildPlugin()
            });
        });
    });
    /**
     * Action: extensions_yield
     */
    bud.hooks.on('filter_adapters_final', function (extensions) {
        return extensions
            .filter(function (_a) {
            var name = _a.name, extension = _a.extension;
            return extension;
        })
            .map(function (_a) {
            var name = _a.name, extension = _a.extension;
            return extension;
        });
    });
    return bud;
};
var bud = init();
exports.bud = bud;
var configs = {
    eslint: require.resolve('../preset/eslint'),
    postcss: require.resolve('../preset/postcss'),
    stylelint: require.resolve('../preset/stylelint')
};
exports.configs = configs;
//# sourceMappingURL=index.js.map