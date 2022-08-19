import type {Config} from '@roots/bud-framework'

import Bud from '../bud.js'
import * as context from '../context/index.js'
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
  overrides?: Partial<Config.Context>,
): Promise<Bud> {
  const basedir = overrides?.basedir ?? process.cwd()

  const ctx = await context.get(basedir)
  const instance = await new Bud().lifecycle(mergeOptions(ctx, overrides))

  instance.when(
    instance.env.has(`APP_PUBLIC_PATH`) &&
      instance.env.isString(`APP_PUBLIC_PATH`),
    () => instance.setPublicPath(instance.env.get(`APP_PUBLIC_PATH`)),
  )

  return instance
}
