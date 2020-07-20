"use strict";
exports.__esModule = true;
exports.define = void 0;
var webpack_1 = require("webpack");
var define = function () { return ({
    mergeOptions: function () {
        return this.bud.options.env;
    },
    make: function () {
        return new webpack_1.DefinePlugin(this.options);
    },
    when: function () {
        return this.options;
    }
}); };
exports.define = define;
