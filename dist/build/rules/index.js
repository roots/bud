"use strict";
exports.__esModule = true;
exports.rules = void 0;
var eslint_1 = require("./js/eslint");
var babel_1 = require("./js/babel");
var typescript_1 = require("./js/typescript");
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
    options: {},
    /**
     * Make webpack rules
     */
    make: function () {
        this.options = {
            module: {
                rules: []
            }
        };
        this.bud.featureEnabled('eslint')
            && this.options.module.rules.push(eslint_1.eslint(this.bud).make());
        this.bud.featureEnabled('typescript')
            && this.options.module.rules.push(typescript_1.typescript(this.bud).make());
        this.bud.featureEnabled('babel')
            && this.options.module.rules.push(babel_1.babel(this.bud).make());
        this.bud.featureEnabled('css')
            && this.options.module.rules.push(css_1.css(this.bud).make());
        this.bud.featureEnabled('cssModules')
            && this.options.module.rules.push(module_1.module(this.bud).make());
        this.bud.featureEnabled('scss')
            && this.options.module.rules.push(scss_1.scss(this.bud).make());
        this.bud.featureEnabled('scssModules')
            && this.options.module.rules.push(module_2.module(this.bud).make());
        this.bud.featureEnabled('font')
            && this.options.module.rules.push(font_1.font(this.bud).make());
        this.bud.featureEnabled('image')
            && this.options.module.rules.push(image_1.image(this.bud).make());
        this.bud.featureEnabled('svg')
            && this.options.module.rules.push(svg_1.svg(this.bud).make());
        return this.options;
    }
}); };
exports.rules = rules;
//# sourceMappingURL=index.js.map