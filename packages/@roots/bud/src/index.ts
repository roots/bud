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

import {Item, Loader, Rule} from '@roots/bud-build'
import {WebpackPlugin} from '@roots/bud-framework'

import Bud from './Bud'
import config from './config'
import factory from './factory'

declare module '@roots/bud-framework' {
  namespace Framework {
    /**
     * Base {@link @roots/bud-extensions#Extension} map
     */
    interface Extensions {
      'webpack-provide-plugin': WebpackPlugin
      'clean-webpack-plugin': WebpackPlugin
      'webpack-config-dump-plugin': WebpackPlugin
      'copy-webpack-plugin': WebpackPlugin
      'css-minimizer-webpack-plugin': WebpackPlugin
      'webpack-define-plugin': WebpackPlugin
      'webpack-hot-module-replacement-plugin': WebpackPlugin
      'ignore-emit-webpack-plugin': WebpackPlugin
      'webpack-manifest-plugin': WebpackPlugin
      'mini-css-extract-plugin': WebpackPlugin
    }

    /**
     * Base {@link @roots/bud-build#Loader} map
     */
    interface Loaders {
      css: Loader
      csv: Loader
      file: Loader
      html: Loader
      md: Loader
      minicss: Loader
      'resolve-url': Loader
      style: Loader
      url: Loader
      xml: Loader
    }

    /**
     * Base {@link @roots/bud-build#Item} map
     */
    interface Items {
      css: Item
      csv: Item
      file: Item
      image: Item
      font: Item
      html: Item
      md: Item
      minicss: Item
      'resolve-url': Item
      raw: Item
      style: Item
      xml: Item
    }

    /**
     * Base {@link @roots/bud-build#Rule} map
     */
    interface Rules {
      js: Rule
      css: Rule
      html: Rule
      svg: Rule
      image: Rule
      font: Rule
      xml: Rule
      json5: Rule
      csv: Rule
      yml: Rule
      toml: Rule
    }
  }
}

export {Bud}

export {config}

export {factory}
