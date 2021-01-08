"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gzip = void 0;
const gzip = function (options) {
    this.store.get('features').enable('gzip');
    if (!options)
        return;
    this.extensions.set('compression-webpack-plugin-gzip.options', options);
    return this;
};
exports.gzip = gzip;
//# sourceMappingURL=gzip.js.map