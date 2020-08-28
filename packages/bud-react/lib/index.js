"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.react = void 0;
var react = function () { return ({
    make: function () {
        this.bud.options.set('babel.presets', __spreadArrays(this.bud.options.get('babel.presets'), [
            require.resolve('@babel/preset-react'),
        ]));
        !this.bud.options
            .get('webpack.resolve.extensions')
            .includes('.jsx') && this.addExtensions(['.jsx']);
    }
}); };
exports.react = react;
//# sourceMappingURL=index.js.map