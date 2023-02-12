import {Bud} from '@roots/bud'
import getContext from '@roots/bud/context'
import {get, has, set} from '@roots/bud/instances'
import type {
  CLIContext,
  CommandContext,
  Context,
} from '@roots/bud-framework/options'

import * as argv from '../context/argv.js'

export interface Options {
  cache: boolean
  find: boolean
}

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
  overrides: Partial<CLIContext | Context | CommandContext> = {},
  options: Options = {cache: true, find: false},
): Promise<Bud> {
  if (!overrides.basedir) overrides.basedir = argv.basedir
  if (!overrides.mode) overrides.mode = `production`

  if (options.cache && has(overrides.basedir))
    return get(overrides.basedir)

  const bud = new Bud()
  const context = await getContext(overrides, options)

  if (options.cache) {
    return await set(context.basedir, bud).lifecycle(context)
  }

  return await bud.lifecycle(context)
}
