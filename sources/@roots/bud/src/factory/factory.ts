import {Bud} from '@roots/bud'
import getContext from '@roots/bud/context'
import type {Overrides} from '@roots/bud/factory/options'
import {get, has, set} from '@roots/bud/instances'

import * as argv from '../context/argv.js'

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
 *
 * @returns Bud instance
 *
 * @public
 */
export async function factory(
  {basedir, ...overrides}: Overrides = {basedir: argv.basedir},
  cache = true,
): Promise<Bud> {
  if (cache && has(basedir)) return get(basedir)

  const bud = new Bud()
  const context = await getContext({basedir, ...overrides}, cache)

  if (cache) {
    set(context.basedir, bud)
    return await get(context.basedir).lifecycle(context)
  }

  return await bud.lifecycle(context)
}
