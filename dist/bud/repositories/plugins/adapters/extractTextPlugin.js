"use strict";
exports.__esModule = true;
exports.dependencyExtraction = void 0;
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var dependencyExtraction = {
    mergeOptions: function () {
        return this.bud.options.get('extractText');
    },
    make: function () {
        return new ExtractTextPlugin();
    },
    when: function () {
        return this.bud.features.enabled('hot');
    }
};
exports.dependencyExtraction = dependencyExtraction;
//# sourceMappingURL=extractTextPlugin.js.map