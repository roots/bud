"use strict";
exports.__esModule = true;
exports.image = void 0;
var loaders_1 = require("./util/loaders");
var patterns_1 = require("./util/patterns");
var image = function (bud) { return ({
    bud: bud,
    make: function () {
        this.options = {
            test: this.bud.hooks.filter('loaders_image_test', patterns_1.patterns.image),
            use: this.bud.hooks.filter('loaders_image_use', [
                {
                    loader: loaders_1.loaders.file,
                    options: {
                        name: '[path][name].[ext]'
                    }
                },
            ])
        };
        return this.bud.hooks.filter('loaders_image_final', this.options);
    }
}); };
exports.image = image;
//# sourceMappingURL=image.js.map