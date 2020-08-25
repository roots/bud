import type {Bud} from '@roots/bud'
import type {
  WebpackConfig,
  WebpackDevServer,
} from '@roots/bud-typings'

import type {Configuration, Stats} from 'webpack'
export type {
  Configuration as WebpackConfig,
  Stats as WebpackStats,
  WebpackDevServer,
}

export interface RunnerProps {
  bud: Bud
}

export type BudRenderer = (
  config: any,
  webpackConfig: Configuration,
) => void

export type CompilerFactory = (
  bud: Bud,
  config: WebpackConfig,
) => CompilerController

export interface CompilerController {
  bud: Bud
  config: WebpackConfig
  compile: () => void
}
