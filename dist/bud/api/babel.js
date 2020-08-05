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
exports.babel = void 0;
var babel = function (options) {
    this.logger.info({ name: 'bud.api', "function": 'bud.babel', options: options }, "bud.babel called");
    this.features.enable('babel');
    this.options.set('babel', __assign(__assign({}, this.options.get('babel')), this.hooks.filter('filter_babel_options', options)));
    this.hooks.call('post_babel');
    return this;
};
exports.babel = babel;
//# sourceMappingURL=babel.js.map