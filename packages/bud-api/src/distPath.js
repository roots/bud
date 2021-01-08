"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.distPath = void 0;
const distPath = function (segment) {
    /** Bounce early if dist is overwritten from CLI */
    if (this.store.isString('args.dist'))
        return this;
    this.store.set('webpack.output.path', this.project(segment));
    return this;
};
exports.distPath = distPath;
//# sourceMappingURL=distPath.js.map