"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.rules = void 0;
var eslint_1 = require("./js/eslint");
var babel_1 = require("./js/babel");
var typescript_1 = require("./js/typescript");
var css_1 = require("./css/css");
var module_1 = require("./css/module");
var module_2 = require("./scss/module");
var image_1 = require("./image");
/**
 * Webpack loaders
 * @type {function} rules
 */
var rules = function (bud) { return ({
    bud: bud,
    output: {},
    options: {
        module: {
            strictExportPresence: true
        }
    },
    /**
     * Make webpack rules
     */
    make: function () {
        this.pre();
        this.output = __assign(__assign({}, this.options), { module: __assign(__assign({}, this.options.module), { rules: [
                    eslint_1.eslint(this).make(),
                    babel_1.babel(this).make(),
                    typescript_1.typescript(this).make(),
                    css_1.css(this).make(),
                    module_1.module(this).make(),
                    scss(this).make(),
                    module_2.module(this).make(),
                    font(this).make(),
                    image_1.image(this).make(),
                    svg(this).make(),
                ] }) });
        this.output.module.rules = this.output.module.rules.filter(function (type) { return type !== null; });
        this.post();
        return this.output;
    },
    /**
     * Hook: pre_modules
     */
    pre: function () {
        this.bud.hooks.call('pre_module', this);
    },
    /**
     * Hook post_modules
     */
    post: function () {
        this.bud.hooks.call('post_module', this.output);
    }
}); };
exports.rules = rules;
