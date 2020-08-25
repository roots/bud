"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.presets = exports.preset = exports.eslint = void 0;
const preset_1 = __importDefault(require("./preset"));
exports.presets = preset_1.default;
const path_1 = require("path");
const rule = (bud) => ({
    enforce: 'pre',
    test: bud.patterns.get('js'),
    exclude: bud.patterns.get('vendor'),
    use: [
        {
            loader: require.resolve('eslint-loader'),
            options: {
                configFile: bud.configs.get('eslint'),
                formatter: 'codeframe',
                failOnError: true,
            },
        },
    ],
});
const eslint = (bud) => ({
    bud,
    name: 'eslint',
    make: function () {
        const config = path_1.join(this.bud.project('.eslintrc.js'));
        if (!this.bud.fs.existsSync(config)) {
            return;
        }
        this.bud.configs.set('eslint', config);
        this.bud.features.set('eslint', true);
        this.bud.rules.push(rule);
    },
});
exports.eslint = eslint;
const preset = {
    roots: path_1.resolve(__dirname, './preset/roots.js'),
    wordpress: path_1.resolve(__dirname, './preset/wordpress.js'),
    react: path_1.resolve(__dirname, './preset/react.js'),
};
exports.preset = preset;
//# sourceMappingURL=index.js.map