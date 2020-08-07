"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stylelint_webpack_plugin_1 = __importDefault(require("stylelint-webpack-plugin"));
/**
 * Adapter: Stylelint Webpack Plugin
 */
const adapter = () => ({
    setOptions: function () {
        return {
            configFile: this.bud.configs.get('stylelint'),
        };
    },
    make: function () {
        return new stylelint_webpack_plugin_1.default(this.options);
    },
    when: function () {
        return this.bud.features.enabled('stylelint');
    },
});
exports.default = adapter;
//# sourceMappingURL=adapter.js.map