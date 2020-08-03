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
exports.image = void 0;
var patterns_1 = require("./util/patterns");
var useFile_1 = require("./use/useFile");
var image = function (bud) { return ({
    bud: bud,
    make: function () {
        this.options = {
            test: this.bud.hooks.filter('loaders_image_test', patterns_1.patterns.image),
            use: [
                this.bud.hooks.filter('loaders_image_use', __assign({}, useFile_1.useFile('webpack.rules.font', bud))),
            ]
        };
        return this.bud.hooks.filter('loaders_image_final', this.options);
    }
}); };
exports.image = image;
//# sourceMappingURL=image.js.map