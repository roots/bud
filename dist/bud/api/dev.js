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
exports.dev = void 0;
var dev = function (options) {
    this.logger.info({ name: 'bud.api', "function": 'bud.dev', options: options }, "bud.dev called");
    this.options.set('dev', __assign(__assign({}, this.options.get('dev')), this.filter('api.dev.filter', options)));
    return this;
};
exports.dev = dev;
//# sourceMappingURL=dev.js.map