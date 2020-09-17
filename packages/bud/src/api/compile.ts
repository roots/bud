import BudInterface from '../Bud'

/**
 * ## bud.compile
 *
 * Compile finalized webpack configuration and run build.
 *
 * ```
 * bud.compile()
 * ```
 */
export type Compile = () => void

const compile: Compile = function (this: BudInterface) {
  this.makeCli()
}

export {compile as default}
