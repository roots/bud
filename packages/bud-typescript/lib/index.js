"use strict";
exports.__esModule = true;
exports.typescript = void 0;
var path_1 = require("path");
var typescript = function () { return ({
    make: function () {
        var configFile = path_1.join(this.bud.project('tsconfig.json'));
        if (this.bud.fs.existsSync(configFile)) {
            this.bud.configs.set('typescript', configFile);
            this.bud.options.set('typescript', {
                configFile: this.bud.configs.get('typescript')
            });
        }
        this.bud.addExtensions(['ts', 'tsx']);
        this.bud.patterns.set('typescript', /\.(ts|tsx)$/);
        this.bud.loaders.set('typescript', require.resolve('ts-loader'));
        this.bud.uses.set('typescript', function (bud) { return ({
            loader: bud.loaders.get('typescript'),
            options: {
                configFile: bud.configs.get('typescript')
            }
        }); });
        this.bud.rules.push(function (bud) { return ({
            test: bud.patterns.get('typescript'),
            exclude: bud.patterns.get('vendor'),
            use: [bud.uses.get('typescript')]
        }); });
        this.bud.apply('typescript', function (options) {
            options.configFile &&
                this.configs.set('typescript', options.configFile);
            this.options.merge('typescript', options);
            return this;
        });
    }
}); };
exports.typescript = typescript;
//# sourceMappingURL=index.js.map