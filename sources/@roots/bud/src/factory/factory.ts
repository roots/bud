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
 *
 * @returns Bud instance
 */
export async function factory(
  {
    basedir,
    ...overrides
  }: Partial<CLIContext | Context | CommandContext> = {},
  options: Options = {cache: true, find: false},
): Promise<Bud> {
  if (!basedir) basedir = argv.basedir ?? process.cwd()
  if (!overrides.mode) overrides.mode = `production`

  if (options.cache && has(basedir)) return get(basedir)

  const bud = new Bud()
  const context = await getContext({basedir, ...overrides}, options)

  if (options.cache) {
    set(context.basedir, bud)
    return await get(context.basedir).lifecycle(context)
  }

  return await bud.lifecycle(context)
}
