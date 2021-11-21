/**
 * This extension wraps {@link @roots/critical-css-webpack-plugin#CriticalCSSPlugin | @roots/critical-css-webpack-plugin}
 * and provides criticalcss support.
 *
 * @beta
 * This extension is under active development. But it should not be considered stable and there may be breaking changes.
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @packageDocumentation
 */

import type { Container } from '@roots/container';
import { CriticalCssWebpackPlugin } from '@roots/critical-css-webpack-plugin';
import type { Extension } from '@roots/bud-framework';
import type { Framework } from '@roots/bud-framework';
import { Options } from '@roots/critical-css-webpack-plugin';

/**
 * Extends bud with critical css
 *
 * @public
 */
declare interface BudCriticalCssPlugin extends Extension.CompilerPlugin<CriticalCssWebpackPlugin, Partial<Options>> {
    name: '@roots/bud-criticalcss';
    options: Partial<Options>;
    api: {
        critical: critical;
    };
    make: (options: Container<Partial<Options>>, app: Framework) => CriticalCssWebpackPlugin;
}

/**
 * Adds critical css webpack plugin to compilation
 *
 * @public
 */
declare const BudCriticalCssPlugin: BudCriticalCssPlugin;
export default BudCriticalCssPlugin;

/**
 * Extract critical CSS
 *
 * @example
 * ```js
 * app.critical({
 *  // ...
 * })
 * ```
 *
 * @public
 */
declare interface critical {
    (this: Framework, userOptions: Partial<CriticalCssWebpackPlugin['options']>): Framework;
}

/**
 * @public
 */
declare const critical: critical;

export { }
