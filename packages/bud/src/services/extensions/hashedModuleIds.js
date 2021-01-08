"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.when = exports.make = exports.options = void 0;
const webpack_1 = require("webpack");
exports.options = {
    hashFunction: 'sha256',
    hashDigest: 'hex',
    hashDigestLength: 20,
};
const make = opt => new webpack_1.HashedModuleIdsPlugin(Object.assign({}, opt.all()));
exports.make = make;
const when = bud => bud.store.enabled('features.hash') && bud.mode.is('production');
exports.when = when;
//# sourceMappingURL=hashedModuleIds.js.map