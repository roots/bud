"use strict";
const path_1 = require("path");
const loader = require.resolve('ts-loader');
const rule = (bud) => ({
    test: /\.(ts|tsx)$/,
    exclude: bud.patterns.get('vendor'),
    use: [
        {
            loader,
            options: {
                configFile: bud.configs.get('typescript'),
            },
        },
    ],
});
const typescript = (bud) => ({
    bud,
    make: function () {
        /**
         * Load tsconfig.json and bail early if not found.
         */
        const config = path_1.join(this.bud.project('tsconfig.json'));
        if (!this.bud.fs.existsSync(config)) {
            return;
        }
        this.bud.configs.set('typescript', config);
        this.bud.options.set('resolve.extensions', [
            ...this.bud.options.get('resolve.extensions'),
            '.ts',
            '.tsx',
        ]);
        this.bud.rules.repository = [...this.bud.rules.repository, rule];
    },
});
module.exports = typescript;
//# sourceMappingURL=index.js.map