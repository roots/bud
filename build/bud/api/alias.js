"use strict";
exports.__esModule = true;
exports.alias = void 0;
/**
 * ## bud.alias
 *
 * Resolve modules through webpack aliases. Useful for situations that may otherwise require brittle relative paths.
 *
 * Having defined this alias:
 *
 * ```js
 * bud.alias({'scripts': bud.src('scripts')})
 * ```
 *
 * You can now reference scripts against that alias in your import statements:
 *
 * ```js
 * import 'scripts/myScript' // replacing '../../myScript'
 * ```
 *
 **/
var alias = function (options) {
    this.state.options.alias = options;
    return this;
};
exports.alias = alias;
//# sourceMappingURL=alias.js.map