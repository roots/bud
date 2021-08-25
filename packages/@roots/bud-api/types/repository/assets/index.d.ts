import type {Framework} from '@roots/bud-framework'
/**
 * Copy static assets during compilation.
 *
 * @remarks
 * You may specify paths with a string literal or glob pattern.
 *
 * @example
 * Copy **src/images** to **dist/images**
 *
 * ```js
 * app.assets(['src/images'])
 * ```
 */
interface assets {
  (this: Framework, from: string[]): Framework
}
declare function assets(
  this: Framework,
  paths: string[],
): Framework
export {assets}
//# sourceMappingURL=index.d.ts.map
