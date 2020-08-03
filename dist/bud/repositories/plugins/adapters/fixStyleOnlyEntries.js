"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.fixStyleOnlyEntries = void 0;
var webpack_fix_style_only_entries_1 = __importDefault(require("webpack-fix-style-only-entries"));
var fixStyleOnlyEntries = {
    options: {
        silent: true
    },
    make: function () {
        if (this.bud.features.enabled('hot')) {
            this.options.ignore = 'webpack-hot-middleware';
        }
        return new webpack_fix_style_only_entries_1["default"](this.options);
    },
    when: function () {
        return (this.bud.features.enabled('css') ||
            this.bud.features.enabled('scss') ||
            this.bud.features.enabled('postcss') ||
            this.bud.features.enabled('scssModules') ||
            this.bud.features.enabled('cssModules'));
    }
};
exports.fixStyleOnlyEntries = fixStyleOnlyEntries;
//# sourceMappingURL=fixStyleOnlyEntries.js.map