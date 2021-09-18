/**
 * Adds dynamic link library (DLL) support to Bud

 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @remarks
 * - 💁 Composable - Build exceptional applications with a modular, configurable build system
 *
 * - 💪 Modern - Modern framework written in TypeScript with an expressive API
 *
 * - 🌱 Easy - Low bundle size and fast build times
 *
 * @extension @packageDocumentation @betaDocumentation
 */

import { Framework } from '@roots/bud-framework';
import { Index } from '@roots/bud-framework';
import { Maybe } from '@roots/bud-framework';

export declare const api: Maybe<[Framework], Index<unknown>> & {
    library: library;
};

/**
 * Cache modules in a DLL
 *
 * @remarks
 * Enables dynamic link library ([DLL](https://en.wikipedia.org/wiki/Dynamic-link_library)) caching
 * of specified modules.
 *
 * @example
 * Supply {@link api.library} the module you would like to add to the DLL.
 *
 * ```js
 * app.library('jquery')
 * ```
 *
 * @example
 * Multiple modules can be added at once using an array
 *
 * ```js
 * app.library(['react', 'react-dom'])
 * ```
 *
 * @public @config @extension
 */
declare interface library {
    (this: Framework, modules: string | string[]): Framework;
}

declare const library: library;

declare const name_2: "@roots/bud-library";
export { name_2 as name }

export { }
