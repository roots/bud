"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = exports.loader = exports.ident = void 0;
const bud_support_1 = require("@roots/bud-support");
/**
 * This fixes issues with SWR thinking its in the browser.
 * @todo does this fix the vue extension issue?
 */
bud_support_1.isEqual(typeof global.navigator, Object) &&
    Object.assign(global, { navigator: undefined });
exports.ident = 'sass';
exports.loader = 'sass-loader';
exports.options = {
    implementation: require('sass'),
};
//# sourceMappingURL=index.js.map