import type { Framework } from '@roots/bud-framework';
import type { Configuration } from 'webpack';
/**
 * Register shorthand for resolving modules using webpack aliases.
 *
 * @remarks
 * Useful for situations that may otherwise require brittle relative paths.
 *
 * @usage
 * ```js
 * app.alias({
 *   '@scripts': app.path('src', 'scripts'),
 * })
 * ```
 */
interface alias {
    (this: Framework, alias: Configuration['resolve']['alias']): Framework;
}
declare const alias: alias;
export { alias };
//# sourceMappingURL=index.d.ts.map