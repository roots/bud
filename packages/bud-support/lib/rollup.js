"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const rollup_plugin_typescript2_1 = __importDefault(require("rollup-plugin-typescript2"));
const plugin_babel_1 = __importDefault(require("@rollup/plugin-babel"));
const plugin_node_resolve_1 = __importDefault(require("@rollup/plugin-node-resolve"));
const rollup_plugin_json_1 = __importDefault(require("rollup-plugin-json"));
const plugin_commonjs_1 = __importDefault(require("@rollup/plugin-commonjs"));
const rollup_plugin_terser_1 = require("rollup-plugin-terser");
/* eslint-disable */
const banner = (pkg) => `/**
 * ${pkg.name} v.${pkg.version} {@link ${pkg.homepage}}
 *
 * ${pkg.description}
 *
 * Issues? {@link ${pkg.bugs.url}}
 *
 * Consider funding our work 🙏🏽 {@link ${pkg.funding.url}}
 *
 * @copyright ${new Date().getFullYear()} Roots {@link https://roots.io}
 * @license ${pkg.license}
 */`;
/* eslint-enable */
const output = (directory, pkg) => [
    {
        banner: banner(pkg),
        file: pkg.main,
        format: 'cjs',
        plugins: [rollup_plugin_terser_1.terser()],
    },
    {
        banner: banner(pkg),
        file: path_1.default.join(directory, pkg.main.replace('.min', '')),
        format: 'cjs',
    },
    {
        banner: banner(pkg),
        dir: path_1.default.join(directory, './lib/es/'),
        format: 'es',
        esModule: true,
        preserveModules: true,
        assetFileNames: true,
    },
];
const rollup = (directory, pkg) => ({
    input: 'src/index.ts',
    output: output(directory, pkg),
    external: [
        ...Object.keys(pkg.dependencies),
        ...Object.keys(pkg.devDependencies),
        'path',
    ],
    plugins: [
        rollup_plugin_typescript2_1.default({
            typescript: require('typescript'),
            useTsconfigDeclarationDir: true,
        }),
        plugin_babel_1.default({
            babelHelpers: 'bundled',
        }),
        plugin_node_resolve_1.default({
            browser: false,
            preferBuiltins: true,
        }),
        plugin_commonjs_1.default(),
        rollup_plugin_json_1.default(),
    ],
});
exports.default = rollup;
//# sourceMappingURL=rollup.js.map