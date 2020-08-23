"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.browserSync = void 0;
var browser_sync_webpack_plugin_1 = __importDefault(require("browser-sync-webpack-plugin"));
var browserSync = function (bud) { return ({
    bud: bud,
    name: 'browser-sync-webpack-plugin',
    options: bud.options.get('webpack.plugins.browsersync'),
    make: function () {
        return new browser_sync_webpack_plugin_1["default"](this.options);
    },
    when: function () {
        return (this.bud.features.enabled('browsersync') &&
            !this.bud.features.enabled('hot'));
    }
}); };
exports.browserSync = browserSync;
//# sourceMappingURL=browserSync.js.map