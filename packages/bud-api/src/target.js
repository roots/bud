"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.target = void 0;
const target = function (target) {
    this.store.get('config').set('target', target);
    return this;
};
exports.target = target;
//# sourceMappingURL=target.js.map