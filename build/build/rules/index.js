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
        this.output = __assign(__assign({}, this.options), { module: __assign(__assign({}, this.options.module), { rules: [
                    eslint_1.eslint(this.bud).make(),
                    babel_1.babel(this.bud).make(),
                    typescript_1.typescript(this.bud).make(),
                    css_1.css(this.bud).make(),
                    module_1.module(this.bud).make(),
                    scss_1.scss(this.bud).make(),
                    module_2.module(this.bud).make(),
                    font_1.font(this.bud).make(),
                    image_1.image(this.bud).make(),
                    svg_1.svg(this.bud).make(),
                ] }) });
        this.output.module.rules = this.output.module.rules.filter(function (type) { return type !== null; });
        return this.output;
    }
}); };
exports.rules = rules;
//# sourceMappingURL=index.js.map