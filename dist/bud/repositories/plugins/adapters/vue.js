"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.vue = void 0;
var plugin_1 = __importDefault(require("vue-loader/lib/plugin"));
var vue = {
    mergeOptions: function () {
        return this.bud.options.get('vue');
    },
    make: function () {
        return new plugin_1["default"](this.options);
    },
    when: function () {
        return this.bud.features.enabled('vue');
    }
};
exports.vue = vue;
//# sourceMappingURL=vue.js.map