/**
 * ⚡️ Frontend build tools combining the best parts of Symfony Encore and Laravel Mix
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @remarks
 * The {@link @roots/bud# | @roots/bud} provides {@link Bud}, a concrete implementation of the {@link @roots/bud-framework#Framework} abstract class.
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
 * @core @packageDocumentation @betaDocumentation
 */

import type { Configuration } from '@roots/bud-framework';
import { Constructor } from '@roots/bud-framework';
import { Extension } from '@roots/bud-framework';
import { Framework as Framework_2 } from '@roots/bud-framework';
import { Item } from '@roots/bud-framework';
import { Loader } from '@roots/bud-framework';
import { Options } from '@roots/bud-framework';
import { Rule } from '@roots/bud-framework';
import { SetOptional } from 'type-fest';

/**
 * ⚡️ Bud - Frontend build tools combining the best parts of Symfony Encore and Laravel Mix
 *
 * @public @core
 */
declare class Bud extends Framework_2 implements Contract {
    /**
     * {@link Bud} class definition
     *
     * @remarks
     * Used internally when creating child Bud instances
     *
     * @public
     */
    implementation: Constructor;
    /**
     * Class constructor
     *
     * @param options - {@link @roots/bud-framework#Options}
     */
    constructor(options: Options);
}
export { Bud }
export { Bud as Framework }

/**
 * {@inheritDoc @roots/bud-framework#Configuration}
 *
 * @public @config
 */
export declare const config: Configuration;

/**
 * Implements {@link @roots/bud-framework#Framework | the Framework abstract class}
 *
 * @public @core
 */
declare interface Contract extends Framework_2 {
    /**
     * {@inheritDoc @roots/bud-framework#implementation}
     *
     * @public
     */
    implementation: Constructor;
}

export { Extension }

/**
 * Create a {@link Bud} instance programatically
 *
 * @example
 * ```ts
 * const bud = factory()
 * ```
 *
 * @public @core @config
 */
export declare function factory(overrides?: Options_2): Bud;

export { Item }

export { Loader }

/**
 * {@link Bud} constructor property overrides
 *
 * @core @public
 */
declare interface Options_2 extends SetOptional<Options, 'name'> {
}

export { Rule }

export { }
