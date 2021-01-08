"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformRuntime = void 0;
const target = require.resolve('@babel/plugin-transform-runtime');
const options = {
    helpers: false,
};
exports.transformRuntime = [
    target,
    options,
];
//# sourceMappingURL=transformRuntime.js.map