"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hot = void 0;
const bud_support_1 = require("@roots/bud-support");
const options = {
    log: false,
    path: '/__webpack_hmr',
    heartbeat: 1000,
};
const hot = (compiler) => bud_support_1.webpackHotMiddleware(compiler, options);
exports.hot = hot;
//# sourceMappingURL=hot.js.map