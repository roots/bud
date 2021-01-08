"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.when = exports.make = exports.options = void 0;
const ignore_emit_webpack_plugin_1 = require("ignore-emit-webpack-plugin");
exports.options = {
    ignorePatterns: [
        /**
         * Prevent Webpack 4 from creating useless .css.js files
         * when an entrypoint includes only css assets.
         */
        /\.*\.css.\.js/,
        /**
         * Stop users from owning themselves with a wholescale moment/locale import.
         *
         * @see {@link https://git.io/JUaNq}
         */
        /^\.\/locale$/,
        /moment$/,
    ],
};
const make = options => new ignore_emit_webpack_plugin_1.IgnoreEmitPlugin(options.get('ignorePatterns'));
exports.make = make;
const when = (_bud, options) => (options === null || options === void 0 ? void 0 : options.has('ignorePatterns')) &&
    options.get('ignorePatterns').length > 0;
exports.when = when;
//# sourceMappingURL=ignoreEmit.js.map