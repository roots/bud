"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = void 0;
const storage = function (path) {
    if (path) {
        this.store.set('webpack.recordsPath', path);
        this.extensions.set('webpack-config-dump-plugin.options.outputPath', path);
    }
    this.store.set('features.buildCache', true);
    return this;
};
exports.storage = storage;
//# sourceMappingURL=storage.js.map