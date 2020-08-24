"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.typescript = void 0;
var path_1 = require("path");
var loader = require.resolve('ts-loader');
var rule = function (bud) { return ({
    test: /\.(ts|tsx)$/,
    exclude: bud.patterns.get('vendor'),
    use: [
        {
            loader: loader,
            options: {
                configFile: bud.configs.get('typescript')
            }
        },
    ]
}); };
var typescript = function (bud) { return ({
    bud: bud,
    name: 'typescript',
    make: function () {
        /**
         * Load tsconfig.json and bail early if not found.
         */
        var config = path_1.join(this.bud.project('tsconfig.json'));
        if (!this.bud.fs.existsSync(config)) {
            return;
        }
        !this.bud.options
            .get('webpack.resolve.extensions')
            .includes('.ts') &&
            this.bud.options.set('webpack.resolve.extensions', __spreadArrays(this.bud.options.get('webpack.resolve.extensions'), [
                '.ts',
            ]));
        !this.bud.options
            .get('webpack.resolve.extensions')
            .includes('.tsx') &&
            this.bud.options.set('webpack.resolve.extensions', __spreadArrays(this.bud.options.get('webpack.resolve.extensions'), [
                '.tsx',
            ]));
        this.bud.rules.repository = __spreadArrays(this.bud.rules.repository, [rule]);
    }
}); };
exports.typescript = typescript;
//# sourceMappingURL=index.js.map