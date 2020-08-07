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
const typescript = () => ({
    make: function () {
        /**
         * Load tsconfig.json and bail early if not found.
         */
        const config = path_1.join(this.bud.project('tsconfig.json'));
        if (!this.bud.fs.existsSync(config)) {
            return;
        }
        /**
         * Set eslintrc to config container
         */
        this.bud.configs.set('typescript', config);
        /**
         * Enable eslint support
         */
        this.bud.features.set('ts', true);
        /**
         * Add eslint rule to webpack modules repository.
         */
        this.bud.rules.repository = [
            ...this.bud.rules.repository,
            (bud) => rule(bud),
        ];
    },
});
module.exports = typescript;
//# sourceMappingURL=index.js.map