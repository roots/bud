"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.template = void 0;
const template = function (options) {
    this.store.enable('features.html');
    (options === null || options === void 0 ? void 0 : options.template) &&
        this.extensions.set('html-webpack-plugin.options.template', options.template);
    (options === null || options === void 0 ? void 0 : options.replacements) &&
        this.extensions.set('interpolate-html-plugin.options.replacements', options.replacements);
    return this;
};
exports.template = template;
//# sourceMappingURL=template.js.map