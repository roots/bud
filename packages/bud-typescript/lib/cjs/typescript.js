/**
 * @roots/bud-typescript v.2.0.0-next.0 {@link undefined}
 *
 * Adds Typescript support to Bud.
 *
 * Issues? {@link https://github.com/roots/bud/issues}
 *
 * Consider funding our work 🙏🏽 {@link https://github.com/sponsors/roots}
 *
 * @copyright 2020 Roots {@link https://roots.io}
 * @license MIT
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var path = require('path');

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
    name: 'typescript',
    make: function () {
        /**
         * Load tsconfig.json and bail early if not found.
         */
        const config = path.join(this.bud.project('tsconfig.json'));
        if (!this.bud.fs.existsSync(config)) {
            return;
        }
        !this.bud.options.get('resolve.extensions').includes('.ts') &&
            this.bud.options.set('resolve.extensions', [
                ...this.bud.options.get('resolve.extensions'),
                '.ts',
            ]);
        !this.bud.options.get('resolve.extensions').includes('.tsx') &&
            this.bud.options.set('resolve.extensions', [
                ...this.bud.options.get('resolve.extensions'),
                '.tsx',
            ]);
        this.bud.rules.repository = [...this.bud.rules.repository, rule];
    },
});

exports.typescript = typescript;
