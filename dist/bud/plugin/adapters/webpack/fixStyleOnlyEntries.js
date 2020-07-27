"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.fixStyleOnlyEntries = void 0;
var webpack_fix_style_only_entries_1 = __importDefault(require("webpack-fix-style-only-entries"));
var fixStyleOnlyEntries = function () { return ({
    options: {
        silent: true
    },
    make: function () {
        return new webpack_fix_style_only_entries_1["default"](this.options);
    },
    when: function () {
        return this.bud.featureEnabled('css') ||
            this.bud.featureEnabled('scss') ||
            this.bud.featureEnabled('postcss') ||
            this.bud.featureEnabled('scssModules') ||
            this.bud.featureEnabled('cssModules');
    }
}); };
exports.fixStyleOnlyEntries = fixStyleOnlyEntries;
//# sourceMappingURL=fixStyleOnlyEntries.js.map