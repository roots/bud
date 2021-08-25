/**
 * ⚡️ Lightning fast frontend build tools combining the best parts of Symfony Encore and Laravel Mix
 *
 * @remarks
 * The `@roots/bud` package provides {@link Bud}, a concrete implementation of the {@link Framework Framework abstract class}.
 *
 * {@link factory} is exported to simplify instantiation for direct use with Node.
 *
 * This package also provides a CLI which can is invoked with `bud`.
 *
 * Exported data & instances:
 * - {@link config} — The default {@link Configuration} used as the {@link Bud.store} {@link Store.repository repository}
 * - {@link extensions} — The default {@link Framework.Extensions} used as the {@link Bud.extensions} {@link Extensions.respository repository}
 * - {@link services} — The default {@link Framework.Services} registered to {@link Bud.services}
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
 * Instantiate `bud` from node using the `factory` function:
 *
 * ```js
 * import {factory} from '@roots/bud'
 *
 * const bud = factory()
 *
 * bud.run() // run build
 * ```
 *
 * @example
 * Instantiate `Bud` from node directly. You must provide the `services` and `config` properties yourself.
 *
 * ```js
 * const instance = new Bud({
 *   name: 'bud',
 *   mode: 'production',
 *   services: {
 *     ...services,
 *   },
 *   config: {
 *     ...config,
 *   },
 * })
 *
 * instance.bootstrap() // bootstrap Framework
 *
 * instance.run() // run build
 * ```
 *
 * @packageDocumentation
 */
import {Item, Loader, Rule} from '@roots/bud-build'
import {
  Framework,
  Module,
  WebpackPlugin,
} from '@roots/bud-framework'
declare module '@roots/bud-framework' {
  namespace Framework {
    /**
     * Registered extensions
     */
    interface Extensions {
      'webpack-provide-plugin'?: Module
      'clean-webpack-plugin'?: Module
      'webpack-config-dump-plugin'?: Module
      'copy-webpack-plugin'?: Module
      'css-minimizer-webpack-plugin'?: Module
      'webpack-define-plugin'?: Module
      'webpack-hot-module-replacement-plugin'?: Module
      'ignore-emit-webpack-plugin'?: Module
      'webpack-manifest-plugin'?: Module
      'mini-css-extract-plugin'?: Module
    }
    /**
     * Registered loaders
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
     * Registered items
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
     * Registered rules
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
export {Item, Loader, Rule}
export {Framework, Module, WebpackPlugin}
export {Bud} from './Bud'
export {extensions} from './Bud/extensions'
export {services} from './Bud/services'
export {config} from './config'
export {Factory, Factory as factory} from './Factory'
//# sourceMappingURL=index.d.ts.map
