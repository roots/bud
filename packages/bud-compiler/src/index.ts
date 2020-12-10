export {Compiler} from './Compiler'

import type {
  Compiler as WebpackCompiler,
  Configuration as WebpackConfiguration,
  Stats as WebpackStats,
} from 'webpack'

export namespace Stats {
  export type Options = {
    json: WebpackStats.ToJsonOptions
    string: WebpackStats.ToStringOptions
  }

  export type Output = {
    string: string
    json: WebpackStats.ToJsonOutput
  }
}

export type {WebpackCompiler, WebpackConfiguration}
