import type {Bud} from './types'

/**
 * ## bud.compile
 *
 * Compile webpack configuration and run build.
 *
 * ```
 * bud.compile()
 * ```
 **/
const compile = function (this: Bud): void {
  this.util.setProcess(this)
  this.compiler(this)
}

export {compile}
