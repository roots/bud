"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.devtool = void 0;
const devtool = function (devtool) {
    this.store.set('features.devtool', true);
    devtool && this.store.set('webpack.devtool', devtool);
    return this;
};
exports.devtool = devtool;
//# sourceMappingURL=devtool.js.map