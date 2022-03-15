// Copyright (c) Roots Foundation, LLC. All rights reserved.
// Licensed under the MIT license.

/**
 * ⚡️ Frontend build tools combining the best parts of Symfony Encore and Laravel Mix
 *
 * This package provides the Bud class and is the main entrypoint for most projects
 * interfacing with Bud.
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @example
 * Example configuration file (`bud.config.js`).
 * This is run by invoking `$ bud build` in the terminal.
 *
 * ```js
 * module.exports = app =>
 *   app
 *   .template({
 *     favicon: app.path('@src', 'favicon.ico'),
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
 * @packageDocumentation
 */

import './interface'

export {Bud} from './Bud'

export {makeContext} from './context'
export {seed} from './seed'
export {extensions} from './extensions'
export {services} from './services'
export {factory} from './factory'
