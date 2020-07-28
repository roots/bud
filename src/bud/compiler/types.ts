/**
 * Typings
 */
import type {Configuration, Compiler, Stats} from 'webpack'
import type {Bud} from '../types'
import type WebpackDevServer from 'webpack-dev-server'

export type {
  Bud,
  Configuration as WebpackConfig,
  Stats as WebpackStats,
  WebpackDevServer,
}

/**
 * Runner Props
 *
 * @interface
 * @property {bud} config - bud container
 * @property {Configuration} webpackConfig - webpack configuration object
 * @property {Compiler} compiler - webpack compiler
 */
export interface RunnerProps {
  bud: Bud
  compiler: Compiler
}

/**
 * BudRenderer
 *
 * @typedef {BudRenderer}
 * @param {bud} bud
 * @param {Configuration} webpackConfig
 * @return {void}
 */
export type BudRenderer = (
  config: Bud,
  webpackConfig: Configuration,
) => void
