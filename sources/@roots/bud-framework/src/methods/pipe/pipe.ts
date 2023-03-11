import isUndefined from '@roots/bud-support/lodash/isUndefined'

import type {Bud} from '../../bud.js'

/**
 * Callback function
 */
interface Callback<T = any> {
  (input: T): Promise<T>
}

/**
 * ## bud.pipe
 * @see {@link https://bud.js.org/docs/bud.pipe}
 */
export interface pipe {
  <T = Bud>(fns: Array<Callback<T>>, value?: T): Promise<T>
}

/**
 * ## bud.pipe
 * @see {@link https://bud.js.org/docs/bud.pipe}
 */
export const pipe: pipe = async function <T = unknown>(
  this: Bud,
  functions: Array<Callback<T>>,
  maybeInitialValue?: T,
) {
  const initialValue = Promise.resolve(
    !isUndefined(maybeInitialValue) ? maybeInitialValue : (this as T),
  )

  return await functions.reduce(
    async (value, fn) => await fn(await value),
    initialValue,
  )
}
