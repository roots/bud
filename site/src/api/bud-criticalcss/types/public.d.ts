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
 * @packageDocumentation @betaDocumentation
 */

import { Container } from '@roots/container';
import { CriticalCssWebpackPlugin } from '@roots/critical-css-webpack-plugin';
import { CriticalCssWebpackPlugin as CriticalCssWebpackPlugin_2 } from '@roots/critical-css-webpack-plugin/types/CriticalCssWebpackPlugin';
import { Framework } from '@roots/bud-framework';
import { Options } from '@roots/critical-css-webpack-plugin';

export declare const api: {
    critical: critical;
};

/**
 * Extract critical CSS
 *
 * @example
 * ```js
 * app.critical({
 *  // ...
 * })
 * ```
 */
declare interface critical {
    (this: Framework, userOptions: Partial<CriticalCssWebpackPlugin['options']>): Framework;
}

declare const critical: critical;

export declare const make: (options: Container<Partial<Options>>, app: Framework) => CriticalCssWebpackPlugin_2;

declare const name_2: "@roots/bud-criticalcss";
export { name_2 as name }

export declare const options: Partial<Options>;

export { }
