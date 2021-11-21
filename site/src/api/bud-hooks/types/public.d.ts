/**
 * Hooks system used for framework eventing.
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @remarks
 * - 💁 Composable - Build exceptional applications with a modular, configurable build system
 *
 * - 💪 Modern - Modern framework that scales from a single file to thousands of lines of code
 *
 * - 🌱 Easy - Low bundle size and fast build times
 *
 * @core @packageDocumentation
 */

import { Framework } from '@roots/bud-framework';
import { Hooks as Hooks_2 } from '@roots/bud-framework';
import { Service } from '@roots/bud-framework';

/**
 * Service allowing for fitering values through callbacks.
 *
 * @example
 * Add a new entry to the `webpack.externals` configuration:
 *
 * ```ts
 * hooks.on(
 *   'build/externals',
 *   externals => ({
 *     ...externals,
 *     $: 'jquery',
 *   }),
 * )
 * ```
 *
 * @example
 * Change the `webpack.output.filename` format:
 *
 * ```ts
 * hooks.on(
 *   'build.output.filename',
 *   () => '[name].[hash:4]',
 * )
 * ```
 *
 * @example
 * Create a new filter for a value:
 *
 * ```ts
 * hooks.filter('my-event-name', DEFAULT_VALUE)
 * ```
 *
 * @example
 * Create a new async filter for a value:
 *
 * ```ts
 * await hooks.promised('my-event-name', async () => DEFAULT_VALUE)
 * ```
 *
 * @public
 */
export declare class Hooks extends Service implements Hooks_2 {
    /* Excluded from this release type: ident */
    /* Excluded from this release type: boot */
    /* Excluded from this release type: get */
    /* Excluded from this release type: set */
    /**
     * Register a function to filter a value.
     *
     * @remarks
     * If a filter calls for this name the function is then run,
     * passing whatever data along for modification. If more than one
     * hook is registered to a name, they will be called sequentially
     * in the order they were registered, with each hook's output used
     * as the input for the next.
     *
     * @example
     * ```js
     * app.hooks.on(
     *   'namespace.name.value',
     *   value => 'replaced by this string',
     * )
     * ```
     *
     * @public
     * @decorator `@bind`
     */
    on(id: Hooks_2.Name, callback: Hooks_2.Hook): Framework;
    /**
     * Hooks filter
     *
     * @remarks
     * The other side of bud.hooks.on. Passes a key and a value. If
     * any filters are registered on that key they will transform
     * the output before it is returned.
     *
     * @example
     * ```js
     * bud.hooks.filter(
     *   'namespace.name.event',
     *   ['array', 'of', 'items'],
     * )
     * ```
     *
     * @public
     */
    filter<T = any>(id: `${Hooks_2.Name & string}`, value?: any): T;
    /**
     * Asyncronous hook filter
     *
     * @remarks
     * This method is used to filter a hook event.
     *
     * @example
     * ```js
     * bud.hooks.filter(
     *   'namespace.name.event',
     *   ['array', 'of', 'items'],
     * )
     * ```
     *
     * @public
     * @decorator `@bind`
     */
    promised<T = any>(id: `${Hooks_2.Name & string}`, value?: any): Promise<T>;
}

export { }
