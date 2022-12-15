import type {Options} from '@roots/bud-framework'

import Bud from '../bud/index.js'
import * as argv from '../context/argv.js'
import getContext from '../context/index.js'
import {mergeOptions} from './options.js'

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
  overrides?: Options.Overrides,
): Promise<Bud> {
  const basedir = overrides?.basedir ?? argv.basedir
  const context = await getContext(basedir)

  overrides?.services
    ?.filter(service => !context?.services.includes(service))
    .map(service => context.services.push(service))

  overrides?.extensions?.builtIn
    ?.filter(extension => !context.extensions.builtIn.includes(extension))
    .map(extension => context.extensions.builtIn.push(extension))

  overrides?.extensions?.discovered
    ?.filter(
      extension => !context.extensions.discovered.includes(extension),
    )
    .map(extension => context.extensions.discovered.push(extension))

  return await new Bud().lifecycle(mergeOptions(context, overrides))
}
