"use strict";
exports.__esModule = true;
exports.rules = void 0;
var eslint_1 = require("./js/eslint");
var babel_1 = require("./js/babel");
var typescript_1 = require("./js/typescript");
var vue_1 = require("./js/vue");
var css_1 = require("./css/css");
var scss_1 = require("./scss/scss");
var module_1 = require("./css/module");
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
    target: {
        module: {
            rules: []
        }
    },
    make: function () {
        if (this.bud.features.enabled('typescript')) {
            this.bud.logger.info({ name: 'webpack.rules' }, "using ts-loader");
            this.target.module.rules.push(typescript_1.typescript(this.bud).make());
        }
        if (this.bud.features.enabled('vue')) {
            this.bud.logger.info({ name: 'webpack.rules' }, "supports vue");
            this.target.module.rules.push(vue_1.vue(this.bud).make());
        }
        if (this.bud.features.enabled('eslint') &&
            !this.bud.features.enabled('typescript')) {
            this.bud.logger.info({ name: 'webpack.rules' }, "supports eslint");
            this.target.module.rules.push(eslint_1.eslint(this.bud).make());
        }
        if (this.bud.features.enabled('babel')) {
            this.bud.logger.info({ name: 'webpack.rules' }, "supports babel");
            this.target.module.rules.push(babel_1.babel(this.bud).make());
        }
        if (this.bud.features.enabled('css')) {
            this.bud.logger.info({ name: 'webpack.rules' }, "supports css");
            this.target.module.rules.push(css_1.css(this.bud).make());
        }
        if (this.bud.features.enabled('cssModules')) {
            this.bud.logger.info({ name: 'webpack.rules' }, "supports css modules");
            this.target.module.rules.push(module_1.module(this.bud).make());
        }
        if (this.bud.features.enabled('scss')) {
            this.bud.logger.info({ name: 'webpack.rules' }, "supports scss");
            this.target.module.rules.push(scss_1.scss(this.bud).make());
        }
        if (this.bud.features.enabled('scssModules')) {
            this.bud.logger.info({ name: 'webpack.rules' }, "supports scss modules");
            this.target.module.rules.push(module_2.module(this.bud).make());
        }
        if (this.bud.features.enabled('font')) {
            this.bud.logger.info({ name: 'webpack.rules' }, "supports fonts");
            this.target.module.rules.push(font_1.font(this.bud).make());
        }
        if (this.bud.features.enabled('image')) {
            this.bud.logger.info({ name: 'webpack.rules' }, "supports images");
            this.target.module.rules.push(image_1.image(this.bud).make());
        }
        if (this.bud.features.enabled('svg')) {
            this.bud.logger.info({ name: 'webpack.rules' }, "supports svg");
            this.target.module.rules.push(svg_1.svg(this.bud).make());
        }
        this.target.rules = this.bud.hooks.filter('webpack.rules', this.target.rules);
        this.bud.logger.info({ name: 'webpack.rules', value: this.target }, "webpack.rules has been generated");
        return this.target;
    }
}); };
exports.rules = rules;
//# sourceMappingURL=index.js.map