/**
 * ⚡️ Frontend build tools combining the best parts of Symfony Encore and Laravel Mix
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @remarks
 *
 * The {@link @roots/bud# | @roots/bud package} provides {@link Bud}, a concrete implementation of the {@link @roots/bud-framework#Framework} abstract class.
 *
 * {@link factory} is exported to simplify instantiation for direct use with Node.
 *
 * This package also provides a CLI which can is invoked with `bud`.
 *
 * @example
 * Example configuration file (`bud.config.js`). This file is run by invoking `bud build` in the terminal.
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
 * @core @packageDocumentation
 */

import type { Configuration } from '@roots/bud-framework';
import { Framework } from '@roots/bud-framework';
import { SetOptional } from 'type-fest';

/**
 * ⚡️ Bud - Frontend build tools combining the best parts of Symfony Encore and Laravel Mix
 *
 * Documentation:
 *
 * - [Bud usage guide](https://bud.js.org/guides/getting-started)
 *
 * - [Bud API documentation](https://bud.js.org/api/bud.bud)
 *
 * @public @core
 */
export declare class Bud extends Framework implements Contract {
    /**
     * {@link Bud} class definition
     *
     * @remarks
     * Used internally when creating child Bud instances
     *
     * @public
     */
    implementation: Framework.Constructor;
    /**
     * Class constructor
     *
     * @param options - {@link @roots/bud-framework#Framework.Options}
     */
    constructor(options: Framework.Options);
}

/**
 * Base config repository
 *
 * @public
 */
export declare const config: Configuration;

/**
 * Implements {@link @roots/bud-framework#Framework | the Framework abstract class}
 *
 * @public @core
 */
declare interface Contract extends Framework {
    /**
     * {@inheritDoc @roots/bud-framework#Framework.implementation}
     *
     * @public
     */
    implementation: Framework.Constructor;
}

/**
 * Create a {@link Bud} instance programatically
 *
 * @example Simple usage
 * ```ts
 * const bud = factory()
 * ```
 *
 * @public @core @config
 */
export declare function factory(overrides: Options): Bud;

/**
 * {@link Bud.ctor} prop overrides
 *
 * @core @public
 */
declare interface Options extends SetOptional<Framework.Options, 'name'> {
}

export { }
