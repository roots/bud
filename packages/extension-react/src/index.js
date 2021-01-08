"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.boot = exports.setItems = exports.setLoaders = void 0;
const svgr = __importStar(require("./@svgr"));
const refresh = __importStar(require("./react-refresh"));
const bud_support_1 = require("@roots/bud-support");
exports.setLoaders = [
    'react-hot-loader',
    'react-hot-loader',
];
exports.setItems = [
    'react-hot',
    {
        ident: 'react-hot',
        loader: 'react-hot-loader',
    },
];
/**
 * @roots/bud-react extension
 */
const boot = bud => {
    // @babel/preset-react
    bud.build.items.merge('babel.options.presets', [
        '@babel/preset-react',
    ]);
    // @svgr
    bud.use(['@svgr', svgr]);
    /**
     * The rest of the boot process only applies in dev.
     */
    if (!bud.mode.is('development'))
        return;
    //  @pmmmwh/react-refresh-webpack-plugin
    bud.use(['@pmmmwh/react-refresh-webpack-plugin', refresh]);
    bud.build.rules.mutate('js', js => (Object.assign(Object.assign({}, js), { use: [
            bud.build.items.get('react-hot'),
            bud.build.items.get('babel'),
        ].filter(Boolean) })));
    bud.build.items.merge('babel.options.plugins', [
        require.resolve('react-refresh/babel'),
    ]);
    bud.store.mutate('webpack.entry', (entry) => (Object.assign({ client: `webpack-dev-server/client?${bud.server.config.get('ssl' ? 'https' : 'http')}://${bud.server.config.get('host')}:${bud.server.config.get('port')}` }, Object.fromEntries(Object.entries(entry).map(([name, value]) => [
        name,
        [
            ...(bud_support_1.isArray(value) ? value : [value]),
            'webpack/hot/dev-server',
        ],
    ])))));
};
exports.boot = boot;
//# sourceMappingURL=index.js.map