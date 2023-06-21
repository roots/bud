import type {Bud} from '@roots/bud'
import type {Context} from '@roots/bud-framework/options'

import makeContext from '@roots/bud/context'
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
export async function factory(
  options: Partial<Context> = {},
): Promise<Bud> {
  const bud = instance.get()
  const resolvedContext = await makeContext(options)
  return await bud.lifecycle({...resolvedContext})
}
