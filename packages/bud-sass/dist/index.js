"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const api_1 = require("./api");
const use_1 = __importDefault(require("./use"));
/**
 * Sass webpack module rule.
 *
 * @type {Rule}
 */
const rule = (bud) => ({
    test: /\.s(c|a)ss$/,
    exclude: bud.patterns.get('vendor'),
    use: [
        bud.uses.get('miniCss')(bud),
        bud.uses.get('css')(bud),
        bud.uses.get('resolveUrl')(bud),
        bud.uses.get('postCss')(bud),
        use_1.default(bud),
    ],
});
/**
 * Bud extension: sass
 *
 * Adds sass support to the Bud framework.
 *
 * @type {Extension}
 */
const sass = (bud) => ({
    bud,
    make: function () {
        this.bud.options.set('resolve.extensions', [
            ...this.bud.options.get('resolve.extensions'),
            '.sass',
            '.scss',
        ]);
        this.bud.sass = api_1.config;
        this.bud.rules.repository = [...this.bud.rules.repository, rule];
    },
});
module.exports = sass;
//# sourceMappingURL=index.js.map