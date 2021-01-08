"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const roots = path_1.resolve(__dirname, './roots.js');
exports.default = {
    extends: [roots],
    globals: {
        wp: true,
    },
    env: {
        node: true,
        es6: true,
        amd: true,
        browser: true,
        jquery: true,
    },
};
//# sourceMappingURL=wordpress.js.map