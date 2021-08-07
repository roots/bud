/**
 * `@roots/bud` is a frontend build framework combining the best parts of Symfony Encore and Laravel Mix
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
 * - {@link items} — The default {@link Framework.Items} registered to {@link Bud.build}
 * - {@link Rules} — The default {@link Framework.Rules} registered to {@link Bud.build}
 * - {@link loaders} — The default {@link Framework.Loaders} registered to {@link Bud.build}
 * - {@link services} — The default {@link Framework.Services} registered to {@link Bud.services}
 *
 * Exported classes:
 * - {@link Container} — Container class
 * - {@link Item} — Webpack RuleSetItem wrapper
 * - {@link Loader}) — Webpack Loader wrapper
 * - {@link Rule} — Webpack RuleSetRule wrapper
 *
 * Exported services:
 * - {@link Api} — Api service (instantiated at {@link Bud.api})
 * - {@link Build} — Build service (instantiated at {@link Bud.build})
 * - {@link Cache} — Cache service (instantiated at {@link Bud.cache})
 * - {@link Compiler} — Compiler service (instantiated at {@link Bud.compiler})
 * - {@link Dashboard} — Dashboard service (instantiated at {@link Bud.dashboard})
 * - {@link Dependencies} — Dependencies service (instantiated at {@link Bud.dependencies})
 * - {@link Discovery} — Discovery service (instantiated at {@link Bud.discovery})
 * - {@link Env} — Env service (instantiated at {@link Bud.env})
 * - {@link Extensions} — Extensions service (instantiated at {@link Bud.extensions})
 * - {@link Hooks} — Hooks service (instantiated at {@link Bud.hooks})
 * - {@link Logger} — Logger service (instantiated at {@link Bud.logger})
 * - {@link Server} — Server service (instantiated at {@link Bud.server})
 * - {@link Store} — Store service (instantiated at {@link Bud.store})
 *
 * Exported interfaces and virtual classes:
 * - {@link Configuration} — Configuration interface
 * - {@link Framework} — Framework interface
 * - {@link Module} — Module interface
 * - {@link Service} — Service interface
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

import {
  Extension,
  Module,
  Plugin,
  Service,
  Store,
} from '@roots/bud-framework'
import {Container} from '@roots/container'

import {Bud, Framework} from './Bud'
import {config, Configuration} from './config'
import {extensions} from './extensions'
import {Factory, factory} from './Factory'
import {services} from './services'
import {Api} from './services/Api'
import {
  Build,
  Item,
  items,
  Loader,
  loaders,
  Rule,
  rules,
} from './services/Build'
import {Cache} from './services/Cache'
import {Compiler} from './services/Compiler'
import {Dashboard} from './services/Dashboard'
import {Dependencies} from './services/Dependencies'
import {Discovery} from './services/Discovery'
import {Env} from './services/Env'
import {Extensions} from './services/Extensions'
import {Hooks} from './services/Hooks'
import {Logger} from './services/Logger'
import {Server} from './services/Server'

export {Bud}

export {Framework}

export {Api}

export {Build}

export {Cache}

export {Compiler}

export {Container}

export {Dashboard}

export {Dependencies}

export {Discovery}

export {Env}

export {Extension}

export {Extensions}

export {Hooks}

export {Logger}

export {Module}

export {Plugin}

export {Server}

export {Service}

export {Store}

export {config}
export type {Configuration}

export {items, rules, loaders}
export {Item, Rule, Loader}

export {factory}
export type {Factory}

export {extensions, services}

/**
 * @hidden
 */
export {run} from '@oclif/command'
/**
 * @hidden
 */
export * as WebpackConfigDumpPlugin from './extensions/webpack-config-dump-plugin'
/**
 * @hidden
 */
export * as WebpackDefinePlugin from './extensions/webpack-define-plugin'
/**
 * @hidden
 */
export * as HotModuleReplacementPlugin from './extensions/webpack-hot-module-replacement-plugin'
/**
 * @hidden
 */
export * as WebpackManifestPlugin from './extensions/webpack-manifest-plugin'
/**
 * @hidden
 */
export * as CleanWebpackPlugin from './extensions/clean-webpack-plugin'
/**
 * @hidden
 */
export * as CopyWebpackPlugin from './extensions/copy-webpack-plugin'
/**
 * @hidden
 */
export * as CssMinimizerWebpackPlugin from './extensions/css-minimizer-webpack-plugin'
/**
 * @hidden
 */
export * as IgnoreEmitWebpackPlugin from './extensions/ignore-emit-webpack-plugin'
/**
 * @hidden
 */
export * as MiniCssExtractPlugin from './extensions/mini-css-extract-plugin'
/**
 * @hidden
 */
export * as WebpackProvidePlugin from './extensions/webpack-provide-plugin'
