import type {Bud} from './types'

const compile = function (this: Bud): void {
  this.util.setProcess(this)
  this.compiler(this)
}

export {compile}
