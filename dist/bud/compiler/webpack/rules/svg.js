"use strict";
exports.__esModule = true;
exports.svg = void 0;
var patterns_1 = require("./util/patterns");
var svg = function (bud) { return ({
    bud: bud,
    output: {
        test: patterns_1.patterns.svg,
        use: [bud.loaders.get('svgr'), bud.loaders.get('url')]
    },
    make: function () {
        this.bud.hooks.call('pre_svg');
        this.output = {
            test: this.bud.hooks.filter('loaders_svg_test', this.output.test),
            use: this.bud.hooks.filter('loaders_svg_use', this.output.use)
        };
        this.bud.hooks.call('post_svg');
        return this.bud.hooks.filter('loaders_svg_final', this.output);
    }
}); };
exports.svg = svg;
//# sourceMappingURL=svg.js.map