"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setConfig = void 0;
/**
 * Set babel transformOptions
 */
function setConfig(opts) {
    this.build.items.set('babel.options', opts);
    return this;
}
exports.setConfig = setConfig;
//# sourceMappingURL=setConfig.js.map