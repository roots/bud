"use strict";
exports.__esModule = true;
exports.rules = void 0;
var eslint_1 = require("./js/eslint");
var babel_1 = require("./js/babel");
var typescript_1 = require("./js/typescript");
var vue_1 = require("./js/vue");
var css_1 = require("./css/css");
var module_1 = require("./css/module");
var scss_1 = require("./scss/scss");
var module_2 = require("./scss/module");
var font_1 = require("./font");
var image_1 = require("./image");
var svg_1 = require("./svg");
/**
 * Webpack loaders
 * @type {function} rules
 */
var rules = function (bud) { return ({
    bud: bud,
    options: {
        module: {
            rules: []
        }
    },
    /**
     * Make webpack rules
     */
    make: function () {
        /*     this.bud.options.target == 'node' &&
          this.options.module.rules.push({test: patterns.js, loader: loaders.shebang})
     */
        this.bud.features.enabled('typescript') &&
            this.options.module.rules.push(typescript_1.typescript(this.bud).make());
        this.bud.features.enabled('vue') &&
            this.options.module.rules.push(vue_1.vue(this.bud).make());
        this.bud.features.enabled('eslint') &&
            !this.bud.features.enabled('typescript') &&
            this.options.module.rules.push(eslint_1.eslint(this.bud).make());
        this.bud.features.enabled('babel') &&
            this.options.module.rules.push(babel_1.babel(this.bud).make());
        this.bud.features.enabled('css') &&
            this.options.module.rules.push(css_1.css(this.bud).make());
        this.bud.features.enabled('cssModules') &&
            this.options.module.rules.push(module_1.module(this.bud).make());
        this.bud.features.enabled('scss') &&
            this.options.module.rules.push(scss_1.scss(this.bud).make());
        this.bud.features.enabled('scssModules') &&
            this.options.module.rules.push(module_2.module(this.bud).make());
        this.bud.features.enabled('font') &&
            this.options.module.rules.push(font_1.font(this.bud).make());
        this.bud.features.enabled('image') &&
            this.options.module.rules.push(image_1.image(this.bud).make());
        this.bud.features.enabled('svg') &&
            this.options.module.rules.push(svg_1.svg(this.bud).make());
        return this.options;
    }
}); };
exports.rules = rules;
//# sourceMappingURL=index.js.map