"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.api = void 0;
const stylelint_webpack_plugin_1 = __importDefault(require("stylelint-webpack-plugin"));
exports.api = {
    stylelint: function (options) {
        this.store.set('features.stylelint', true);
        this.extensions.set('@roots/bud-stylelint.options', options);
        return this;
    },
};
const register = function (bud) {
    bud.store.set('presets.stylelint', bud.disk
        .get('project')
        .path.resolve(__dirname, './preset/index.js'));
    bud.when(bud.disk.get('project').get('stylelint.config.js'), () => bud.store.set('features.stylelint', true));
    bud.extensions.set('stylelint-webpack-plugin', {
        make: function (options) {
            return new stylelint_webpack_plugin_1.default(options.all());
        },
        when: function ({ store }) {
            return store.enabled('features.stylelint');
        },
    });
};
exports.register = register;
//# sourceMappingURL=index.js.map