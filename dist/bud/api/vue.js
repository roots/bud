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
exports.vue = void 0;
var vue = function (vueOptions) {
    var _a;
    this.logger.info(__assign({ name: 'bud.api', "function": 'bud.vue' }, vueOptions), "bud.vue called");
    this.features.set({ vue: (_a = vueOptions === null || vueOptions === void 0 ? void 0 : vueOptions.enabled) !== null && _a !== void 0 ? _a : true });
    this.features.enabled('vue') &&
        this.options.merge('vue', this.hooks.filter('api.vue.filter', vueOptions === null || vueOptions === void 0 ? void 0 : vueOptions.options));
    return this;
};
exports.vue = vue;
//# sourceMappingURL=vue.js.map