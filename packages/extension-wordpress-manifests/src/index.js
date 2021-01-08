"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.use = void 0;
const merged_manifest_webpack_plugin_1 = __importDefault(require("@roots/merged-manifest-webpack-plugin"));
/**
 * @roots/bud-wordpress-manifests boot
 */
const use = (bud) => bud.use([
    '@roots/bud-entrypoints',
    '@roots/bud-wordpress-externals',
    [
        '@roots/merged-manifest-webpack-plugin',
        {
            make: (_opts, bud) => new merged_manifest_webpack_plugin_1.default({
                entrypointsName: bud.extensions.get('@roots/bud-entrypoints.options.name'),
                wordpressName: bud.extensions.get('@roots/bud-wordpress-externals.opotions.name'),
                file: 'entrypoints.json',
            }),
        },
    ],
]);
exports.use = use;
//# sourceMappingURL=index.js.map