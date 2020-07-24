"use strict";
exports.__esModule = true;
exports.svg = void 0;
var loaders_1 = require("./util/loaders");
var patterns_1 = require("./util/patterns");
/**
 * SVG module rules
 * @return {object}
 */
var svg = function (bud) { return ({
    bud: bud,
    output: {},
    test: patterns_1.patterns.svg,
    loaders: [loaders_1.loaders.svgr, loaders_1.loaders.url],
    /**
     * Make svg rules
     */
    make: function () {
        this.pre();
        this.output = {
            test: this.test,
            use: this.loaders
        };
        this.post();
        return this.output;
    },
    /**
     * Hook: pre_svg
     */
    pre: function () {
        this.bud.hooks.call('pre_svg', this);
    },
    /**
     * Hook: post_svg
     */
    post: function () {
        this.bud.hooks.call('post_svg', this.output);
    }
}); };
exports.svg = svg;
//# sourceMappingURL=svg.js.map