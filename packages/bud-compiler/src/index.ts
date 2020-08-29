import {render} from './render'
import {CompilerController, CompilerFactory} from './types'

const compiler: CompilerFactory = (
  bud,
  config,
): CompilerController => ({
  bud,
  config,
  compile: function () {
    render(this.bud, this.config)
  },
})

export {compiler}
export type {CompilerController, CompilerFactory}
