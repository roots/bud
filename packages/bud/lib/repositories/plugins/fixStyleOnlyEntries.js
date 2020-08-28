"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.fixStyleOnlyEntries = void 0;
var webpack_fix_style_only_entries_1 = __importDefault(require("webpack-fix-style-only-entries"));
var fixStyleOnlyEntries = function (bud) { return ({
    bud: bud,
    options: bud.options.get('webpack.plugins.fixStyleOnlyEntries'),
    make: function () {
        if (this.bud.features.enabled('hot')) {
            this.options.ignore = 'webpack-hot-middleware';
        }
        return new webpack_fix_style_only_entries_1["default"](this.options);
    },
    when: function () {
        return (this.bud.options
            .get('webpack.resolve.extensions')
            .includes('.css') ||
            this.bud.options
                .get('webpack.resolve.extensions')
                .includes('.scss') ||
            this.bud.options
                .get('webpack.resolve.extensions')
                .includes('.sass'));
    }
}); };
exports.fixStyleOnlyEntries = fixStyleOnlyEntries;
//# sourceMappingURL=fixStyleOnlyEntries.js.map