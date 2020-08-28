"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.addExtensions = void 0;
var addExtensions = function (extensions) {
    var _this = this;
    extensions.map(function (ext) {
        !_this.options
            .get('webpack.resolve.extensions')
            .includes("." + ext) &&
            _this.options.set('webpack.resolve.extensions', __spreadArrays(_this.options.get('webpack.resolve.extensions'), [
                "." + ext,
            ]));
    });
    return this;
};
exports.addExtensions = addExtensions;
//# sourceMappingURL=addExtensions.js.map