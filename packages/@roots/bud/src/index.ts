// Copyright (c) Roots Foundation, LLC. All rights reserved. Licensed under the MIT license.

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

import {
  Extension,
  Item,
  Loader,
  Rule,
} from '@roots/bud-framework'

import Bud from './Bud'
import config from './config'
import factory from './factory'

declare module '@roots/bud-framework' {
  interface Plugins {
    'webpack-provide-plugin': Extension.CompilerPlugin
    'clean-webpack-plugin': Extension.CompilerPlugin
    'webpack-config-dump-plugin': Extension.CompilerPlugin
    'copy-webpack-plugin': Extension.CompilerPlugin
    'css-minimizer-webpack-plugin': Extension.CompilerPlugin
    'webpack-define-plugin': Extension.CompilerPlugin
    'webpack-hot-module-replacement-plugin': Extension.CompilerPlugin
    'ignore-emit-webpack-plugin': Extension.CompilerPlugin
    'webpack-manifest-plugin': Extension.CompilerPlugin
    'mini-css-extract-plugin': Extension.CompilerPlugin
  }

  interface Loaders {
    css: Loader.Interface
    csv: Loader.Interface
    file: Loader.Interface
    html: Loader.Interface
    md: Loader.Interface
    minicss: Loader.Interface
    'resolve-url': Loader.Interface
    style: Loader.Interface
    url: Loader.Interface
    xml: Loader.Interface
  }

  interface Items {
    css: Item.Interface
    csv: Item.Interface
    file: Item.Interface
    image: Item.Interface
    font: Item.Interface
    html: Item.Interface
    md: Item.Interface
    minicss: Item.Interface
    'resolve-url': Item.Interface
    raw: Item.Interface
    style: Item.Interface
    xml: Item.Interface
  }

  interface Rules {
    js: Rule.Interface
    css: Rule.Interface
    html: Rule.Interface
    svg: Rule.Interface
    image: Rule.Interface
    font: Rule.Interface
    xml: Rule.Interface
    json5: Rule.Interface
    csv: Rule.Interface
    yml: Rule.Interface
    toml: Rule.Interface
  }
}

export {Bud, Bud as Framework}

export {config}
export {factory}
