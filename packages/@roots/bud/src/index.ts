/**
 * @module @roots/bud
 */

/**
 * @exports Bud
 */
export {Bud} from './Bud'

/**
 * @exports factory
 */
export {factory, Factory} from './factory'

/**
 * @exports config
 * @exports Configuration
 */
export {config, Configuration} from './config'

/**
 * Extensions
 */
export {extensions} from './extensions'
export * as WebpackConfigDumpPlugin from './extensions/webpack-config-dump-plugin'
export * as WebpackDefinePlugin from './extensions/webpack-define-plugin'
export * as HotModuleReplacementPlugin from './extensions/webpack-hot-module-replacement-plugin'
export * as WebpackManifestPlugin from './extensions/webpack-manifest-plugin'
export * as CleanWebpackPlugin from './extensions/clean-webpack-plugin'
export * as CopyWebpackPlugin from './extensions/copy-webpack-plugin'
export * as CssMinimizerWebpackPlugin from './extensions/css-minimizer-webpack-plugin'
export * as IgnoreEmitWebpackPlugin from './extensions/ignore-emit-webpack-plugin'
export * as MiniCssExtractPlugin from './extensions/mini-css-extract-plugin'
export * as WebpackProvidePlugin from './extensions/webpack-provide-plugin'

/**
 * @exports services
 */
export {services} from './services'

/**
 * @exports Api
 * @exports repository
 */
export {Api, repository} from '@roots/bud-api'

/**
 * @roots/bud-build
 */
export {
  Build,
  items,
  loaders,
  rules,
  Item,
  Rule,
  Loader,
} from '@roots/bud-build'

export {Cache} from '@roots/bud-cache'
export {Compiler} from '@roots/bud-compiler'
export {
  Dashboard,
  Screen,
  Error,
  Progress,
} from '@roots/bud-dashboard'

export {Dependencies} from './services/Dependencies'
export {Discovery} from './services/Discovery'
export {Env} from './services/Env'
export {Extensions} from './services/Extensions'
export {Hooks} from './services/Hooks'
export {Logger} from './services/Logger'
export {Server} from './services/Server'

/**
 * Framework
 */
export {
  Framework,
  Extension,
  Module,
  Plugin,
  Service,
  Bootstrapper,
  Store,
} from '@roots/bud-framework'
