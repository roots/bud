"use strict";
exports.__esModule = true;
exports.entry = void 0;
var entry = function (bud) { return ({
    bud: bud,
    name: "webpack.entry",
    target: {},
    make: function () {
        if (!this.bud.options.has('entry')) {
            this.bud.logger.warn({ name: 'webpack.entry', value: this.target }, "No entrypoints found. Automatically generating.");
            this.bud.glob("*/*.(js|css|scss|vue|ts|tsx)");
        }
        this.target.entry = this.bud.hooks.filter('webpack.entry', this.bud.options.get('entry'));
        this.bud.logger.info({ name: 'webpack.entry', value: this.target }, "webpack.entry has been generated");
        return this.target;
    }
}); };
exports.entry = entry;
//# sourceMappingURL=entry.js.map