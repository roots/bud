"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.injectClient = void 0;
const lodash_1 = require("lodash");
/**
 * Client script
 */
const toInject = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000';
/**
 * Injects webpack.entry items with hot module scripts.
 */
const injectClient = store => Object.entries(store.get('webpack.entry')).reduce((entries, [name, assets]) => (Object.assign(Object.assign({}, entries), { [name]: [
        toInject,
        ...(lodash_1.isArray(assets) ? assets : [assets]),
    ] })), { client: [toInject] });
exports.injectClient = injectClient;
//# sourceMappingURL=injectClient.js.map