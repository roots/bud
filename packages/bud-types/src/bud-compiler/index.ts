import {Bud} from '../bud'
import {WebpackConfig} from '../externals/webpack'

interface Compiler {
  bud: Bud
  config: WebpackConfig
  compile: () => void
}

export type Factory = (
  bud: Bud,
  config: WebpackConfig,
) => Compiler
export type Renderer = (bud: Bud, config: WebpackConfig) => void
