"use strict";
exports.__esModule = true;
exports.font = void 0;
var loaders_1 = require("./util/loaders");
var patterns_1 = require("./util/patterns");
/**
 * Font module rules
 *
 * @typedef {function} font
 * @return {object}
 */
var font = function (builder) { return ({
    builder: builder,
    make: function () {
        return {
            test: patterns_1.patterns.font,
            use: [
                {
                    loader: loaders_1.loaders.url,
                    options: {
                        name: '[path][name].[ext]'
                    }
                },
            ]
        };
    }
}); };
exports.font = font;
//# sourceMappingURL=font.js.map