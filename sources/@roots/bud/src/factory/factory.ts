import {isAbsolute, resolve} from 'node:path'

import {Bud} from '@roots/bud'
import getContext from '@roots/bud/context'
import * as argv from '@roots/bud/context/argv'
import * as options from '@roots/bud/factory/options'
import {get, has} from '@roots/bud/instances'
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
): Promise<Bud> {
  const rawbasedir = overrides?.basedir ?? argv.basedir
  const basedir = isAbsolute(rawbasedir)
    ? rawbasedir
    : resolve(process.cwd(), rawbasedir)

  if (cache && has(basedir)) return get(basedir)
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

  return cache
    ? await get(context.basedir).lifecycle(
        options.merge(context, overrides),
      )
    : await new Bud().lifecycle(options.merge(context, overrides))
}
