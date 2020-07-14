import {join} from 'path'
import {makeWebpackConfig} from './builder/webpack'
import {compile} from './compile'
import {compileSafeMode} from './compileSafeMode'

/**
 * Project config => webpack config
 */
const config = require(join(process.cwd(), 'bud.config.js'))
process.env.BABEL_ENV = config.options.mode
process.env.NODE_ENV = config.options.mode
const webpackConfig = makeWebpackConfig(config)

/**
 * Kill the application on unhandled rejections.
 */
process.on('unhandledRejection', () => {
  process.exit()
})

/**
 * Run compiler.
 *
 * @description If config.features.dashboard is disabled then utilize "safe mode".
 */
config.features.dashboard
  ? compile(config, webpackConfig) // standard bud compiler
  : compileSafeMode(config, webpackConfig) // standard webpack stats output
