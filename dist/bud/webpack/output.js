"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.output = void 0;
var output = function (bud) { return ({
    bud: bud,
    target: {
        output: {
            path: bud.paths.get('dist'),
            publicPath: bud.paths.get('public'),
            filename: bud.features.enabled('hash')
                ? bud.options.get('filenameTemplate').hashed + ".js"
                : bud.options.get('filenameTemplate')["default"] + ".js"
        }
    },
    make: function () {
        this.target.output.filename = this.bud.hooks.filter('filter_output_filename', this.target.output.filename);
        this.target = this.bud.hooks.filter('filter_output_final', this.target);
        this.bud.logger.info(__assign({ name: 'webpack_output' }, this.target), "webpack.output has been generated");
        return this.target;
    }
}); };
exports.output = output;
//# sourceMappingURL=output.js.map