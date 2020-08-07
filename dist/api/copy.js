var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { join } from 'path';
var copy = function (from, to) {
    this.logger.info({ name: 'bud.copy', "function": 'bud.copy', from: from, to: to }, "bud.copy called");
    this.options.set('copy', {
        patterns: __spreadArrays(this.options.get('copy').patterns, [
            this.hooks.filter('bud.copy.filter', {
                from: from,
                to: to ? to : join(this.paths.get('dist'), from)
            }),
        ])
    });
    return this;
};
export { copy };
//# sourceMappingURL=copy.js.map