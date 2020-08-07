import { patterns } from './util/patterns';
var svg = function (bud) { return ({
    bud: bud,
    output: {
        test: patterns.svg,
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
export { svg };
//# sourceMappingURL=svg.js.map