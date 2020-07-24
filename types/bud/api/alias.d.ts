import type { Alias } from './types';
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
declare const alias: Alias;
export { alias };
//# sourceMappingURL=alias.d.ts.map