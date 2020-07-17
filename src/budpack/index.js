import {join} from 'path'
import {webpackConfig} from './builder/webpack'
import {compile} from './compile'
import {compileSafeMode} from './compileSafeMode'
import {dump} from './dump'

/**
 * Load project config.
 */
const bud = require(join(process.cwd(), 'bud.config.js'))

/**
 * Process
 */
process.env.BABEL_ENV = bud.options.mode
process.env.NODE_ENV = bud.options.mode
process.on('unhandledRejection', error => {
  bud.hooks.call('compile_error', {bud, error})
  process.exit()
})

/**
 * Project config => webpack config
 */
bud.hooks.call('pre_config', bud)
const compiledConfig = webpackConfig(bud).compile()
bud.hooks.call('post_config', compiledConfig)
bud.features.dump && dump(compiledConfig)

/**
 * Run compiler.
 *
 * @description If config.features.dashboard is disabled then utilize "safe mode".
 */
bud.features.dashboard
  ? compile(bud, compiledConfig) // bud compiler
  : compileSafeMode(bud, compiledConfig) // standard webpack stats output
