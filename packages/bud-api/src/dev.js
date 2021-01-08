"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dev = void 0;
const dev = function (config) {
    var _a, _b;
    if (((_a = config === null || config === void 0 ? void 0 : config.proxy) === null || _a === void 0 ? void 0 : _a.host) || ((_b = config === null || config === void 0 ? void 0 : config.proxy) === null || _b === void 0 ? void 0 : _b.port)) {
        this.store.set('features.proxy', true);
    }
    this.server.config.mergeStore(config);
    return this;
};
exports.dev = dev;
//# sourceMappingURL=dev.js.map