var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { join } from 'path';
var copyAll = function (from, to) {
    this.logger.info({ name: 'bud.api', "function": 'bud.copyAll', from: from, to: to }, "bud.copyAll called");
    this.options.set('copy', {
        patterns: __spreadArrays(this.options.get('copy').patterns, [
            this.hooks.filter('bud.copyAll.filter', {
                from: '**/*',
                context: from,
                to: to ? to : join(this.paths.get('dist'), from),
                globOptions: {
                    ignore: '.*'
                },
                noErrorOnMissing: true
            }),
        ])
    });
    return this;
};
export { copyAll };
//# sourceMappingURL=copyAll.js.map