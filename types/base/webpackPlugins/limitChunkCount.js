"use strict";
exports.__esModule = true;
exports.limitChunkCount = void 0;
var webpack_1 = require("webpack");
var limitChunkCount = function () { return ({
    setOptions: function () {
        var enabled = this.bud.features.splitting;
        var chunks = this.bud.options.splitting.maxChunks;
        if (!enabled) {
            return {
                maxChunks: 1
            };
        }
        if (chunks) {
            return {
                maxChunks: chunks
            };
        }
    },
    make: function () {
        return new webpack_1.LimitChunkCountPlugin(this.options);
    },
    when: function () {
        return this.options;
    }
}); };
exports.limitChunkCount = limitChunkCount;
