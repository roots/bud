import {Bud} from '@roots/bud'
import getContext from '@roots/bud/context'
import * as options from '@roots/bud/factory/options'
import {get, has, set} from '@roots/bud/instances'
import type {Options} from '@roots/bud-framework'

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
  cache: boolean = true,
  find: boolean = false,
): Promise<Bud> {
  if (cache && has(overrides?.basedir)) return get(overrides?.basedir)

  let context: Options.Context
  try {
    context = await getContext(overrides?.basedir, find)
  } catch (error) {
    throw error
  }

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

  set(context.basedir, new Bud())

  return cache
    ? await get(context.basedir).lifecycle(
        options.merge(context, overrides),
      )
    : await get(context.basedir).lifecycle(
        options.merge(context, overrides),
      )
}
