"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const use = (bud) => ({
    loader: require.resolve('sass-loader'),
    options: {
        ...bud.options.get('sass'),
        sourceMap: true,
        implementation: (() => {
            try {
                if (require.resolve('sass')) {
                    return require('sass');
                }
            }
            catch (_a) {
                return require('node-sass');
            }
        })(),
    },
});
exports.default = use;
//# sourceMappingURL=use.js.map