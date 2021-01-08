"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicPath = void 0;
const publicPath = function (publicPath) {
    this.store.set('webpack.output.publicPath', this.disk.path.normalize(`/${publicPath}/`));
    return this;
};
exports.publicPath = publicPath;
//# sourceMappingURL=publicPath.js.map