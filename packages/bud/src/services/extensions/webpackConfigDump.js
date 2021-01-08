"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.when = exports.make = exports.options = void 0;
const webpack_config_dump_plugin_1 = require("webpack-config-dump-plugin");
const options = ({ store }) => ({
    name: 'webpack.debug.js',
    outputPath: store
        .get('webpack.recordsPath')
        .split('/')
        .splice(0, store.get('webpack.recordsPath').split('/').length - 1)
        .join('/'),
    keepCircularReferences: true,
});
exports.options = options;
const make = options => new webpack_config_dump_plugin_1.WebpackConfigDumpPlugin(options.getStore());
exports.make = make;
const when = ({ store }) => store.enabled('features.debug');
exports.when = when;
//# sourceMappingURL=webpackConfigDump.js.map