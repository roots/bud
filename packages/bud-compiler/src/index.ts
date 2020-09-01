import {render} from './render'
import {CompilerController, CompilerFactory} from './types'
import {Bud, WebpackConfig} from '@roots/bud-typings'

const compiler: CompilerFactory = (
  bud: Bud,
  config: WebpackConfig,
): CompilerController => ({
  bud,
  config,
  compile: function () {
    render(this.bud, this.config)
  },
})

export {compiler}
export type {CompilerController, CompilerFactory}
