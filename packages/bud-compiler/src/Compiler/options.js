"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Stats common
 */
const commonStats = {
    all: false,
    version: true,
    hash: true,
    timings: true,
    builtAt: false,
    assets: true,
    chunks: false,
    children: false,
    errors: true,
    entrypoints: true,
};
/**
 * Stats options.
 */
const options = {
    json: Object.assign(Object.assign({}, commonStats), { cachedAssets: true }),
    string: Object.assign(Object.assign({}, commonStats), { colors: true }),
};
exports.default = options;
//# sourceMappingURL=options.js.map