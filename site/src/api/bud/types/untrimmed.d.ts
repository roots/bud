/**
 * ⚡️ Frontend build tools combining the best parts of Symfony Encore and Laravel Mix
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @remarks
 * The {@link @roots/bud# | @roots/bud} package provides the `Bud` class, a concrete implementation
 * of the {@link @roots/bud-framework#Framework} interface.
 *
 * {@link factory} is exported to simplify instantiation for direct use with Node.
 *
 * This package also provides a CLI which can is invoked with `bud`.
 *
 * @example
 * Example configuration file (`bud.config.js`).
 * This is run by invoking `$ bud build` in the terminal.
 *
 * ```js
 * module.exports = app =>
 *   app
 *   .template({
 *     favicon: app.path('src', 'favicon.ico'),
 *     minify: false,
 *   })
 *   .entry('app', 'index.js')
 * ```
 *
 * @example
 * Instantiate `Bud` from node using the `factory` function:
 *
 * ```js
 * import {factory} from '@roots/bud'
 *
 * const bud = factory()
 *
 * bud.run() // run build
 * ```
 *
 * @remarks
 * - 💁 Composable - Build exceptional applications with a modular, configurable build system
 *
 * - 💪 Modern - Modern framework written in TypeScript with an expressive API
 *
 * - 🌱 Easy - Low bundle size and fast build times
 *
 * @packageDocumentation @betaDocumentation
 */

import type { Configuration } from '@roots/bud-framework';
import { Constructor } from '@roots/bud-framework';
import { Framework } from '@roots/bud-framework';
import * as Framework_2 from '@roots/bud-framework';

/**
 * ⚡️ Bud - Frontend build tools combining the best parts of Symfony Encore and Laravel Mix
 *
 * @public @core
 */
export declare class Bud extends Framework {
    /**
     * @public
     */
    implementation: Constructor;
}

/**
 * {@inheritDoc @roots/bud-framework#Configuration}
 *
 * @public @config
 */
export declare const config: Configuration;

/**
 * Create a {@link Bud} instance programatically
 *
 * @example
 * ```ts
 * const bud = factory()
 * ```
 *
 * @public
 */
export declare function factory(overrides?: Options): Promise<Bud>;

export { Framework }

/**
 * {@link Bud} constructor property overrides
 *
 * @core @public
 */
declare interface Options extends Partial<Framework_2.Options> {
    config: Partial<Framework_2.Options> & {
        features?: Partial<Framework_2.Options['config']['features']>;
        location?: Partial<Framework_2.Options['config']['location']>;
        cache?: Partial<Framework_2.Options['config']['cache']>;
        mode?: Framework_2.Options['config']['mode'];
        cli?: Framework_2.Options['config']['cli'];
        name?: Framework_2.Options['config']['name'];
    };
    services?: Partial<Framework_2.Options['services']>;
}

export { }
