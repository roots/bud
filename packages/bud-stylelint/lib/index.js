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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.preset = exports.stylelint = void 0;
var stylelint_webpack_plugin_1 = __importDefault(require("stylelint-webpack-plugin"));
var path_1 = require("path");
var stylelint = function (bud) { return ({
    bud: bud,
    make: function () {
        var config = this.bud.fs.join(this.bud.project('stylelint.config.js'));
        if (this.bud.fs.existsSync(config)) {
            this.bud.features.enable('stylelint');
            this.bud.configs.set('stylelint', config);
            this.bud.options.set('webpack.plugins.stylelint.configFile', this.bud.configs.get('stylelint'));
        }
        this.bud.apply('stylelint', function (options) {
            this.features.enable('stylelint');
            this.options.set('webpack.plugins.stylelint', options);
            return this;
        });
        this.bud.plugins.set('stylelint-webpack-plugin', function (bud) { return ({
            bud: bud,
            make: function () {
                return new stylelint_webpack_plugin_1["default"](__assign({ configFile: this.bud.options.get('webpack.plugins.stylelint.configFile') || this.bud.configs.get('webpack.plugins.stylelint') }, this.bud.options.get('webpack.plugins.stylelint')));
            },
            when: function () {
                return this.bud.features.enabled('stylelint');
            }
        }); });
    }
}); };
exports.stylelint = stylelint;
var preset = {
    roots: path_1.resolve(__dirname, './preset/index.js')
};
exports.preset = preset;
//# sourceMappingURL=index.js.map