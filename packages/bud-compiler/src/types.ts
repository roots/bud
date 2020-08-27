import type {Framework} from '@roots/bud-framework'
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
  bud: Framework
}

export type BudRenderer = (
  config: any,
  webpackConfig: Configuration,
) => void

export type CompilerFactory = (
  bud: Framework,
  config: WebpackConfig,
) => CompilerController

export interface CompilerController {
  bud: Framework
  config: WebpackConfig
  compile: () => void
}
