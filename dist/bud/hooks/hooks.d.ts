import type { Hooks } from './types';
/**
 * ## bud.hooks
 *
 * Register callback.
 *
 * ```js
 * bud.hooks.on('hookName', function(value) {
 *   doSomething(value)
 * })}
 * ```
 *
 * Invoke registered callback(s)
 *
 * ```js
 * bud.hooks.call('hookName', value)
 * ```
 */
declare const hooks: Hooks;
export { hooks };
//# sourceMappingURL=hooks.d.ts.map