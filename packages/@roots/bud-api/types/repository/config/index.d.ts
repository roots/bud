import type {Framework} from '@roots/bud-framework'
/**
 * Modify the {@link Framework Framework} baseline config.
 *
 * @remarks
 * Values defined in this function are more likely to be overwritten by {@link Framework Framework} hooks, etc.
 * If there is a more direct way to make your change it is better to not use this function.
 *
 * Still, this function provides utility for certain use cases.
 *
 * @example
 * ```js
 * app.config({
 *   theme: {
 *     colors: {
 *       foreground: '#FFFFFF',
 *       faded: '#6C758F',
 *       primary: '#545DD7',
 *       primaryAlt: '#663399',
 *       error: '#dc3545',
 *       errorAlt: '#b22222',
 *       warning: '#FF611A',
 *       success: '#46D46A',
 *       accent: '#ff69b4',
 *       flavor: '#78C5D7',
 *     },
 *   },
 * })
 * ```
 */
interface config {
  (this: Framework, config?: any): Framework
}
declare const config: config
export {config}
//# sourceMappingURL=index.d.ts.map
