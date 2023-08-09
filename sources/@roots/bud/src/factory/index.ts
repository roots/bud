import type {Bud} from '@roots/bud'

import makeContext, {type Options} from '@roots/bud/context'
import * as instance from '@roots/bud/instance'

/**
 * Create a {@link Bud} instance programatically
 *
 * @example
 * ```ts
 * const bud = await factory()
 * ```
 *
 * @example
 * Running in a particular mode
 *
 * ```ts
 * const bud = await factory({mode: 'development'})
 * ```
 */
export async function factory(options: Options = {}): Promise<Bud> {
  const bud = instance.get()
  const context = await makeContext(options)
  return await bud.initialize({...context})
}
