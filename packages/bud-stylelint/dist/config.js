"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = function (options) {
    var _a;
    this.features.set('stylelint', (_a = options === null || options === void 0 ? void 0 : options.enabled) !== null && _a !== void 0 ? _a : true);
    this.features.enabled('stylelint') &&
        this.options.set('stylelint', {
            configFile: this.configs.get('stylelint'),
            ...options,
        });
    return this;
};
exports.default = config;
//# sourceMappingURL=config.js.map