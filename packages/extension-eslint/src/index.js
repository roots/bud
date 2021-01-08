"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = exports.when = exports.make = exports.options = exports.boot = void 0;
const eslint_webpack_plugin_1 = __importDefault(require("eslint-webpack-plugin"));
/**
 * Bud custom formatter for teletype logging.
 */
const bud_support_1 = require("@roots/bud-support");
/**
 * On boot, set defaults and add presets.
 */
const boot = bud => {
    const path = bud.disk.get('@roots/bud-eslint');
    bud.store.enable('features.eslint');
    bud.store.set('presets.eslint.roots', path.get('presets/roots.js'));
    bud.store.set('presets.eslint.react', path.get('presets/react.js'));
    bud.store.set('presets.eslint.wp', path.get('presets/wp.js'));
};
exports.boot = boot;
/**
 * Eslint class options.
 */
const options = bud => ({
    context: bud.project(),
    eslintPath: require.resolve('eslint'),
    fix: false,
    formatter: bud_support_1.eslintFormatter,
});
exports.options = options;
/**
 * Make the plugin from its options.
 */
const make = opts => new eslint_webpack_plugin_1.default(opts.getStore());
exports.make = make;
/**
 * Make when
 */
const when = ({ store }) => store.enabled('features.slint');
exports.when = when;
/**
 * Extend config file API
 */
const api = () => ({
    eslintConfig: function (opts) {
        const plugin = this.extensions.get('@roots/bud-eslint');
        Object.entries(opts).map(([k, v]) => plugin.set(k, v));
        return this;
    },
    enableEslint: function (enabled = true) {
        this.store[enabled ? `enable` : `disable`]('eslint');
        return this;
    },
});
exports.api = api;
//# sourceMappingURL=index.js.map