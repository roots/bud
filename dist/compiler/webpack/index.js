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
import { entry } from './entry';
import { devServer } from './devServer';
import { externals } from './externals';
import { general } from './general';
import { rules } from './rules/index';
import { optimization } from './optimization';
import { output } from './output';
import { webpackResolve } from './webpackResolve';
import { plugins } from './plugins';
var build = function (bud) { return ({
    /**
     * The bud container.
     */
    bud: bud,
    /**
     * The final webpack config.
     */
    final: {},
    /**
     * Builders webpack concerns.
     */
    builders: [
        ['output', output],
        ['entry', entry],
        ['module', rules],
        ['plugins', plugins],
        ['resolve', webpackResolve],
        ['externals', externals],
        ['devServer', devServer],
        ['general', general],
    ],
    /**
     * Generate values from builders
     */
    make: function () {
        var _this = this;
        /**
         * Conditionally enabled: optimization
         */
        this.bud.features.enabled('optimize') &&
            this.builders.push(['optimization', optimization]);
        /**
         * Build
         */
        this.builders.map(function (_a) {
            var name = _a[0], builder = _a[1];
            _this.final = __assign(__assign({}, _this.final), builder(_this.bud).make());
        });
        /**
         * Return final config object
         */
        this.final = this.bud.hooks.filter('webpack_final', this.final);
        return this.final;
    }
}); };
export { build };
//# sourceMappingURL=index.js.map