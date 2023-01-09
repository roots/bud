import get from '@roots/bud-support/lodash/get'
import set from '@roots/bud-support/lodash/set'

import type {BudImageminExtension} from '../extension.js'
import type {Minimizer} from '../index.js'

export type MutateMinimizerOptions<
  K extends `${keyof Minimizer & string}`,
> = (minimizer: Minimizer[K]) => Minimizer[K]

export type ConfigureMinimizerArgs = [
  string,
  Minimizer[`minimizer`] | MutateMinimizerOptions<`minimizer`>,
]

export type ConfigureMinimizerByKeyArgs<
  K extends `${keyof Minimizer & string}`,
> = [string, K, Minimizer[K] | MutateMinimizerOptions<K>]

export interface configure {
  <K extends `${keyof Minimizer & string}`>(
    this: BudImageminExtension,
    ...args: ConfigureMinimizerArgs | ConfigureMinimizerByKeyArgs<K>
  ): BudImageminExtension
}

/**
 * Configure
 *
 * @see {@link https://bud.js.org/extensions/bud-imagemin/configure}
 */
export const configure: configure = function (...args) {
  const [id, key, input] =
    args.length === 3 ? args : [args[0], `minimizer`, args[1]]

  const minimizer = this.getMinimizer(id)
  const option = get(minimizer, key)
  const value = typeof input === `function` ? input(option) : input

  return this.setMinimizer(id, set(minimizer, key, value))
}
