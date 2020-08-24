/**
 * Typings
 */
import type {Configuration, Stats} from 'webpack'
import type {
  WebpackConfig,
  WebpackDevServer,
} from '@roots/bud-typings'
export type {
  Configuration as WebpackConfig,
  Stats as WebpackStats,
  WebpackDevServer,
}

export interface RunnerProps {
  bud: any
}

export type BudRenderer = (
  config: any,
  webpackConfig: Configuration,
) => void

export type CompilerFactory = (
  bud: any,
  config: WebpackConfig,
) => CompilerController

export interface CompilerController {
  bud: any
  config: WebpackConfig
  compile: () => void
}
