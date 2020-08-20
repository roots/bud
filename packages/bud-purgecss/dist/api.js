"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const postcss_purgecss_1 = __importDefault(require("@fullhuman/postcss-purgecss"));
/**
 * ## bud.purge
 *
 * Purge unused CSS from compiled stylesheets
 *
 * @see https://purgecss.com/guides/wordpress.html
 * @see https://purgecss.com/configuration.html
 *
 * ```js
 * bud.purge({
 *   enabled: bud.inProduction,
 *   content: [bud.project('resources/views/**')],
 *   allow: require('purgecss-with-wordpress').whitelist,
 *   allowPatterns: require('purgecss-with-wordpress').whitelistPatterns,
 * })
 * ```
 */
const config = function (options) {
    this.options.set('postCss', {
        ...this.options.get('postCss'),
        plugins: [
            ...this.options.get('postCss').plugins,
            postcss_purgecss_1.default(options.options),
        ],
    });
    return this;
};
module.exports = config;
//# sourceMappingURL=api.js.map