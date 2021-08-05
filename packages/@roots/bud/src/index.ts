/**
 * `@roots/bud` is a frontend build framework combining the best parts of Symfony Encore and Laravel Mix
 *
 * @remarks
 * The `@roots/bud` package provides {@link Bud Bud}, a concrete implementation of the {@link Framework Framework} abstract class
 * and its required interfaces.
 *
 * A {@link factory factory} function is exported to simplify instantiation for programmatic usage.
 *
 * It also provides a CLI which can be invoked with `bud`.
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
import {
  Dashboard,
  Error,
  Progress,
  Screen,
} from './services/Dashboard'
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
/**
 * @hidden
 */
export {Screen}
/**
 * @hidden
 */
export {Error}
/**
 * @hidden
 */
export {Progress}
