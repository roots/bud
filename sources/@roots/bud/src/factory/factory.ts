import {Bud} from '@roots/bud'
import getContext from '@roots/bud/context'
import type {
  CLIContext,
  CommandContext,
  Context,
} from '@roots/bud-framework/options'

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
 */
export async function factory(
  ctx: Partial<CLIContext | Context | CommandContext> = {},
): Promise<Bud> {
  if (!ctx.basedir) ctx.basedir = argv.basedir ?? process.cwd()

  const context = await getContext(ctx)

  const bud = new Bud()
  return await bud.lifecycle(context)
}
