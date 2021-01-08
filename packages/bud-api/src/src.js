"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.src = void 0;
const src = function (segment) {
    return segment
        ? this.disk.path.resolve(this.store.get('webpack.context'), segment)
        : this.store.get('webpack.context');
};
exports.src = src;
//# sourceMappingURL=src.js.map