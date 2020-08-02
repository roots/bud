"use strict";
exports.__esModule = true;
exports.font = void 0;
var loaders_1 = require("./util/loaders");
var patterns_1 = require("./util/patterns");
var font = function (bud) { return ({
    bud: bud,
    make: function () {
        this.options = {
            test: this.bud.hooks.filter('loaders_font_test', patterns_1.patterns.font),
            use: this.bud.hooks.filter('loaders_font_use', [
                {
                    loader: loaders_1.loaders.url,
                    options: {
                        name: '[path][name].[ext]'
                    }
                },
            ])
        };
        return this.bud.hooks.filter('loaders_font_final', this.options);
    }
}); };
exports.font = font;
//# sourceMappingURL=font.js.map