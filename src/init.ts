import {join} from 'path'
import {webpackBuilder} from './webpack'
import {renderCompilerDashboard} from './compiler/renderCompilerDashboard'
import {compileSafeMode} from './compileSafeMode'
import {dump} from './bud/base/util/dump'

/**
 * Bud container object
 */
const budInstance: bud = require(join(
  process.cwd(),
  'bud.config.js',
))

/**
 * Webpack configuraton mode
 */
const mode: bud['mode'] = budInstance.mode

/**
 * Use bud's default dashboard when enabled
 */
const dashboardEnabled: boolean =
  budInstance.features.dashboard

/**
 * Dump config to stdout close process before build when enabled
 */
const dumpEnabled: boolean = budInstance.features.dump

/**
 * Process handling
 */
process.env.BABEL_ENV = mode
process.env.NODE_ENV = mode
process.on('unhandledRejection', error => {
  budInstance.hooks.call('compile_error', {
    bud: budInstance,
    error,
  })

  process.exit()
})

/**
 * Pre-configuration hook
 */
budInstance.hooks.call('pre_config', budInstance)

/**
 * webpack configuration
 */
const compiledConfig: Configuration = webpackBuilder(
  budInstance,
).compile()

/**
 * Post-configuration hook (finalizes webpack configuration)
 */
budInstance.hooks.call('post_config', compiledConfig)

/**
 * Dump if dumpEnabled conditional check is true
 */
dumpEnabled && dump(compiledConfig)

/**
 * Run compiler.
 */
dashboardEnabled
  ? renderCompilerDashboard(budInstance, compiledConfig) // enabled: bud compiler
  : compileSafeMode(budInstance, compiledConfig) // disabled: more standard stats output

/**
 * Typings
 */
import type {bud} from './bud'
import type {Configuration} from 'webpack'

export type {bud}
export type {BudRenderer} from './compiler/renderCompilerDashboard'
