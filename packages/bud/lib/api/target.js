"use strict";
exports.__esModule = true;
exports.target = void 0;
var target = function (target) {
    this.webpack.set('target', this.hooks.filter('api.target', target));
    return this;
};
exports.target = target;
//# sourceMappingURL=target.js.map