// Copyright (c) Roots Foundation, LLC. All rights reserved.
// Licensed under the MIT license.

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

import './interface'

export {Bud} from './Bud'

export {config} from './config'

export {factory} from './factory'

export {Framework} from '@roots/bud-framework'
