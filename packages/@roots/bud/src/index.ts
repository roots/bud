/**
 * Framework re-export
 */
export {Framework} from '@roots/bud-framework'
export {Bud} from './Bud'

/**
 * Base config
 */
export {config} from './config'

/**
 * Base extensions & webpack plugins.
 */
export {extensions} from './extensions'
export * as WebpackConfigDumpPlugin from './extensions/webpack-config-dump-plugin'
export * as DefineWebpackPlugin from './extensions/webpack-define-plugin'
export * as HotModuleReplacementPlugin from './extensions/webpack-hot-module-replacement-plugin'
export * as WebpackManifestPlugin from './extensions/webpack-manifest-plugin'
export * as CleanWebpackPlugin from './extensions/clean-webpack-plugin'
export * as CopyWebpackPlugin from './extensions/copy-webpack-plugin'
export * as CssMinimizerWebpackPlugin from './extensions/css-minimizer-webpack-plugin'
export * as IgnoreEmitWebpackPlugin from './extensions/ignore-emit-webpack-plugin'
export * as MiniCssExtractPlugin from './extensions/mini-css-extract-plugin'
export * as WebpackProvidePlugin from './extensions/webpack-provide-plugin'

/**
 * Base framework services
 */
export {services} from './services'
export * as Api from '@roots/bud-api'
export * as Build from '@roots/bud-build'
export * as Cache from '@roots/bud-cache'
export * as Compiler from '@roots/bud-compiler'
export * as Dashboard from '@roots/bud-dashboard'
export * as Dependencies from './services/Dependencies/index'
export * as Discovery from './services/Discovery/index'
export * as Env from './services/Env/index'
export * as Extensions from './services/Extensions/index'
export * from './services/Hooks/index'
export * from './services/Logger/index'
export * from './services/Server/index'
