"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fallback = exports.extensions = exports.alias = void 0;
exports.alias = {};
exports.extensions = [
    '.wasm',
    '.mjs',
    '.js',
    '.json',
    '.css',
];
exports.fallback = {
    setImmediate: false,
    module: false,
    dns: 'mock',
    process: false,
    Buffer: false,
    fs: false,
    http2: false,
    net: false,
    tls: false,
    child_process: false,
};
//# sourceMappingURL=resolve.js.map