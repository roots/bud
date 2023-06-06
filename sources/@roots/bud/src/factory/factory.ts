import {Bud} from '@roots/bud'
import getContext from '@roots/bud/context'
import type {Context} from '@roots/bud-framework/options'

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
  context: Partial<Context> = {},
): Promise<Bud> {
  const bud = new Bud()
  const resolvedContext = await getContext(context)
  return await bud.lifecycle({...resolvedContext})
}
