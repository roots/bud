"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dist = void 0;
const dist = function (path) {
    return path
        ? this.disk
            .get('project')
            .path.join(this.store.get('webpack.output.path'), path)
        : this.store.get('webpack.output.path');
};
exports.dist = dist;
//# sourceMappingURL=dist.js.map