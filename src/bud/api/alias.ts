import type { Bud, Alias } from "./types";

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
const alias: Alias = function (this: Bud, options: object): Bud {
  this.state.options.alias = options;

  return this;
};

export { alias };
