import { join } from 'path';
var webpackResolve = function (bud) { return ({
    bud: bud,
    target: {
        resolve: {
            extensions: ['.js', '.json'],
            modules: [
                bud.paths.get('project'),
                bud.paths.get('src'),
                join(bud.paths.get('framework')),
            ]
        }
    },
    extensions: ['js', 'jsx', 'ts', 'tsx'],
    make: function () {
        var _this = this;
        /**
         * Alias resolution
         */
        if (this.bud.options.has('alias')) {
            this.target.resolve.alias = this.bud.options.get('alias');
        }
        /**
         * Ensure bundle support
         */
        this.extensions.forEach(function (ext) { return _this.ensureSupport(ext); });
        /**
         * Filter, log & return
         */
        this.target = this.bud.hooks.filter('webpack.resolve', this.target);
        this.bud.logger.info({ name: 'webpack.resolve', value: this.target }, "webpack.resolve has been generated");
        return this.target;
    },
    /**
     * Ensure extensions supported
     */
    ensureSupport: function (ext) {
        if (!this.bud.features.enabled(ext)) {
            return;
        }
        var missedExt = this.target.resolve.extensions.filter(function (supported) { return supported !== ext; }).length <
            1;
        if (missedExt) {
            this.target.resolve.extensions.push("." + ext);
            this.bud.logger.warn({ name: 'webpack.resolve' }, "." + ext + " support added by support check.");
        }
    }
}); };
export { webpackResolve };
//# sourceMappingURL=webpackResolve.js.map