"use strict";
exports.__esModule = true;
exports.image = void 0;
var loaders_1 = require("./util/loaders");
var patterns_1 = require("./util/patterns");
/**
 * Image module rules
 *
 * @type     {Function} image
 * @property {imageLoaderOptions} options
 * @return {object}
 */
var image = function (bud) { return ({
    bud: bud,
    options: {
        test: patterns_1.patterns.image,
        use: [
            {
                loader: loaders_1.loaders.file,
                options: {
                    name: '[path][name].[ext]'
                }
            },
        ]
    },
    make: function () {
        this.doHook('pre');
        this.doHook('post');
        return this.options;
    },
    doHook: function (name) {
        this.bud.hooks.call(name + "_webpack_rules_image", this.options, this.bud);
    }
}); };
exports.image = image;
//# sourceMappingURL=image.js.map