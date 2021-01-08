"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.srcPath = void 0;
const srcPath = function (segment) {
    /** Bounce early if src is overwritten from CLI */
    if (this.store.isString('args.src'))
        return this;
    this.store.set('webpack.context', this.project(segment));
    return this;
};
exports.srcPath = srcPath;
//# sourceMappingURL=srcPath.js.map