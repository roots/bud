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
exports.dependencyManifest = void 0;
var dependencyManifest = function (settings) {
    this.features.enable('dependencyManifest');
    settings &&
        this.options.set('dependencyManifest', __assign(__assign({}, this.options.get('dependencyManifest')), settings));
    return this;
};
exports.dependencyManifest = dependencyManifest;
//# sourceMappingURL=dependencyManifest.js.map