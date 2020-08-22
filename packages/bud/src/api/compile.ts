import type {Bud} from './types'

type Compile = (this: Bud) => void

const compile: Compile = function () {
  this.hooks
    .filter('bud.compiler.filter', this.compiler)
    .buildConfig()
    .compile()
}

export {compile}
export type {Compile}
