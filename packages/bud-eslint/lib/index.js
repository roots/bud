"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preset = exports.eslint = void 0;
const path_1 = require("path");
const eslint = (bud) => ({
    bud,
    make: function () {
        const config = path_1.join(this.bud.project('.eslintrc.js'));
        if (!this.bud.fs.existsSync(config)) {
            return;
        }
        this.bud.configs.set('eslint', config);
        this.bud.features.set('eslint', true);
        this.bud.uses.set('eslint', (bud) => ({
            loader: require.resolve('eslint-loader'),
            options: {
                configFile: bud.configs.get('eslint'),
                formatter: 'codeframe',
                failOnError: true,
            },
        }));
        this.bud.rules.set('eslint', (bud) => ({
            enforce: 'pre',
            test: bud.patterns.get('js'),
            exclude: bud.patterns.get('vendor'),
            use: [bud.uses.get('eslint')(bud)],
        }));
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