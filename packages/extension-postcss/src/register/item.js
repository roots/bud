"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = exports.loader = exports.ident = void 0;
/**
 * PostCSS identifer
 */
exports.ident = 'postcss';
/**
 * PostCSS loader
 */
exports.loader = 'postcss-loader';
/**
 * Fallback options if no postcss.config.js is found.
 */
const fallbackOptions = {
    postcssOptions: {
        plugins: [
            'postcss-flexbugs-fixes',
            [
                'postcss-preset-env',
                {
                    autoprefixer: {
                        flexbox: 'no-2009',
                    },
                    features: {
                        [`custom-properties`]: false,
                    },
                    stage: 3,
                },
            ],
            'postcss-nested',
        ],
    },
};
/**
 * Postcss options
 */
const options = (bud) => {
    const config = bud.disk.get('project').has('postcss.config.js')
        ? bud.disk.get('project').get('postcss.config.js')
        : null;
    return config !== null && config !== void 0 ? config : fallbackOptions;
};
exports.options = options;
//# sourceMappingURL=item.js.map