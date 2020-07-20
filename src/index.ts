import {join} from 'path'
import {webpackConfig} from './builder/webpack'
import {renderCompilerDashboard} from './compiler/renderCompilerDashboard'
import {compileSafeMode} from './compileSafeMode'
import {dump} from './util/dump'

/**
 * Load project config.
 */
const budInstance: bud = require(join(
  process.cwd(),
  'bud.config.js',
))
const mode: string = budInstance.options.mode
const dashboardEnabled: boolean =
  budInstance.features.dashboard

/**
 * Process
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
 * Project config => webpack config
 */
budInstance.hooks.call('pre_config', budInstance)
const compiledConfig = webpackConfig(budInstance).compile()
budInstance.hooks.call('post_config', compiledConfig)

budInstance.features.dump && dump(compiledConfig)

/**
 * Run compiler.
 */
dashboardEnabled
  ? renderCompilerDashboard(budInstance, compiledConfig) // enabled: bud compiler
  : compileSafeMode(budInstance, compiledConfig) // disabled: more standard stats output

import type {bud} from './builder'

export type {bud}
export type {BudRenderer} from './compiler/renderCompilerDashboard'
