"use strict";
exports.__esModule = true;
exports.implementation = void 0;
/**
 * resolve whether to use dart-sass or node-sass
 */
var implementation = function () {
    try {
        return require.resolve('sass')
            ? require('sass')
            : require('node-sass');
    }
    catch (_a) {
        return require('node-sass');
    }
};
exports.implementation = implementation;
