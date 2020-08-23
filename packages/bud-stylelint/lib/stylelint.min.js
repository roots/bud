/**
 * @roots/bud-stylelint v.2.0.0-next.0 {@link undefined}
 *
 * Adds stylelint support to Bud
 *
 * Issues? {@link https://github.com/roots/bud/issues}
 *
 * Consider funding our work 🙏🏽 {@link https://github.com/sponsors/roots}
 *
 * @copyright 2020 Roots {@link https://roots.io}
 * @license MIT
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var path = require('path');
var StylelintPlugin = require('stylelint-webpack-plugin');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var StylelintPlugin__default = /*#__PURE__*/_interopDefaultLegacy(StylelintPlugin);

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
        return new StylelintPlugin__default['default'](this.options);
    },
    when: function () {
        return this.bud.features.enabled('stylelint');
    },
});

const api = function (options) {
    var _a;
    this.features.set('stylelint', (_a = options === null || options === void 0 ? void 0 : options.enabled) !== null && _a !== void 0 ? _a : true);
    this.features.enabled('stylelint') &&
        this.options.set('stylelint', {
            configFile: this.configs.get('stylelint'),
            ...options,
        });
    return this;
};

/**
 * Bud extension: Stylelint support.
 */
const stylelint = (bud) => ({
    bud,
    name: 'stylelint',
    make: function () {
        /**
         * Load .stylelintrc.js and bail early if not found.
         */
        const config = path.join(this.bud.project('stylelint.config.js'));
        if (!this.bud.fs.existsSync(config)) {
            return;
        }
        /**
         * Set bud.stylelint API method.
         */
        this.bud.apply('stylelint', api);
        /**
         * Set stylelint to config container
         */
        this.bud.configs.set('stylelint', config);
        /**
         * Enable stylelint support
         */
        this.bud.features.set('stylelint', true);
        /**
         * Add stylelint webpack adapter
         */
        this.bud.adapters.add(adapter);
    },
});
const preset = {
    roots: path.resolve(__dirname, './preset/index.js'),
};

exports.preset = preset;
exports.stylelint = stylelint;
