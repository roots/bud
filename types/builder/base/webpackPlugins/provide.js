"use strict";
exports.__esModule = true;
exports.provide = void 0;
var webpack_1 = require("webpack");
var provide = function () { return ({
    setOptions: function () {
        return this.bud.options.auto;
    },
    make: function () {
        return new webpack_1.ProvidePlugin(this.options);
    },
    when: function () {
        return this.options;
    }
}); };
exports.provide = provide;
