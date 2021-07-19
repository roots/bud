/**
 * Bud
 * @exports Bud
 */
export {Bud} from './Bud'

/**
 * Factory
 * @exports factory
 */
export {factory, Factory} from './factory'

/**
 * Config
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
 * Services
 */
export {services} from './services'
export {Api, methods} from '@roots/bud-api'
export {
  Build,
  items,
  loaders,
  rules,
  Item,
  Rule,
  Loader,
} from '@roots/bud-build'

export * from '@roots/bud-cache'
export * from '@roots/bud-compiler'
export * from '@roots/bud-dashboard'

export * from './services/Dependencies'
export * from './services/Discovery'
export * from './services/Env'
export * from './services/Extensions'
export * from './services/Hooks'
export * from './services/Logger'
export * from './services/Server'

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
