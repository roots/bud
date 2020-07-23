/**
 * Typings
 */
import type {Configuration, Compiler} from 'webpack'
import type {Bud} from '../bud'

export type {Bud}
export type {Configuration as WebpackConfig}

/**
 * Runner Props
 *
 * @interface
 * @property {bud} config - bud container
 * @property {Configuration} webpackConfig - webpack configuration object
 * @property {Compiler} compiler - webpack compiler
 */
export interface RunnerProps {
  config: object
  webpackConfig: Configuration
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
