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
            this.target.module.rules.push(typescript_1.typescript(this.bud).make());
            this.bud.logger.info({ name: 'webpack.rules' }, "using ts-loader");
        }
        if (this.bud.features.enabled('vue')) {
            this.target.module.rules.push(vue_1.vue(this.bud).make());
            this.bud.logger.info({ name: 'webpack.rules' }, "using vue-loader");
        }
        if (this.bud.features.enabled('eslint')
            && !this.bud.features.enabled('typescript')) {
            this.target.module.rules.push(eslint_1.eslint(this.bud).make());
            this.bud.logger.info({ name: 'webpack.rules' }, "using eslint-loader");
        }
        if (this.bud.features.enabled('babel')) {
            this.target.module.rules.push(babel_1.babel(this.bud).make());
            this.bud.logger.info({ name: 'webpack.rules' }, "using babel-loader");
        }
        if (this.bud.features.enabled('css')) {
            this.target.module.rules.push(css_1.css(this.bud).make());
            this.bud.logger.info({ name: 'webpack.rules' }, "using css-loader");
        }
        if (this.bud.features.enabled('cssModules')) {
            this.target.module.rules.push(module_1.module(this.bud).make());
            this.bud.logger.info({ name: 'webpack.rules' }, "supporting css modules");
        }
        if (this.bud.features.enabled('scss')) {
            this.target.module.rules.push(scss_1.scss(this.bud).make());
            this.bud.logger.info({ name: 'webpack.rules' }, "using sass-loader");
        }
        if (this.bud.features.enabled('scssModules')) {
            this.target.module.rules.push(module_2.module(this.bud).make());
            this.bud.logger.info({ name: 'webpack.rules' }, "supporting scss modules");
        }
        if (this.bud.features.enabled('font')) {
            this.target.module.rules.push(font_1.font(this.bud).make());
            this.bud.logger.info({ name: 'webpack.rules' }, "supporting font files with file-loader");
        }
        if (this.bud.features.enabled('image')) {
            this.target.module.rules.push(image_1.image(this.bud).make());
            this.bud.logger.info({ name: 'webpack.rules' }, "supporting image files with file-loader");
        }
        if (this.bud.features.enabled('svg')) {
            this.target.module.rules.push(svg_1.svg(this.bud).make());
            this.bud.logger.info({ name: 'webpack.rules' }, "supporting svg files with @svgr");
        }
        this.target = this.bud.hooks.filter('webpack.rules', this.target);
        return this.target;
    }
}); };
exports.rules = rules;
//# sourceMappingURL=index.js.map