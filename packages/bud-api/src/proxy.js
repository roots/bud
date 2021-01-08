"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.proxy = void 0;
const props = ['host', 'port'];
const proxy = function (config) {
    var _a;
    this.store.set('features.proxy', (_a = config === null || config === void 0 ? void 0 : config.enabled) !== null && _a !== void 0 ? _a : true);
    config &&
        props.forEach(prop => {
            config[prop] &&
                this.server.config.set(`proxy.${prop}`, config[prop]);
        });
    return this;
};
exports.proxy = proxy;
//# sourceMappingURL=proxy.js.map