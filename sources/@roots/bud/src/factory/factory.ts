import {Bud} from '@roots/bud'
import getContext from '@roots/bud/context'
import type {
  CLIContext,
  CommandContext,
  Context,
} from '@roots/bud-framework/options'

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
  const bud = new Bud()
  return await bud.lifecycle(await getContext(ctx))
}
