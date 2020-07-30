"use strict";
exports.__esModule = true;
exports.vue = void 0;
var vue = function (vueOptions) {
    var _a;
    this.features.set({ vue: (_a = vueOptions === null || vueOptions === void 0 ? void 0 : vueOptions.enabled) !== null && _a !== void 0 ? _a : true });
    this.features.enabled('vue') &&
        this.options.merge('vue', this.hooks.filter('filter_api_vue_options', vueOptions === null || vueOptions === void 0 ? void 0 : vueOptions.options));
    return this;
};
exports.vue = vue;
//# sourceMappingURL=vue.js.map