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
  overrides?: Partial<Config.Options>,
): Promise<Bud> {
  const ctx = await context.get(overrides.basedir ?? process.cwd())
  const project = await new Bud().lifecycle(mergeOptions(ctx, overrides))

  project
    .when(
      project.env.has('APP_PUBLIC_PATH') &&
        project.env.isString('APP_PUBLIC_PATH'),
      () => project.setPublicPath(project.env.get('APP_PUBLIC_PATH')),
    )
    .log({
      message: `process.env.NODE_ENV: ${process.env.NODE_ENV}`,
    })
    .log({
      message: `process.env.BABEL_ENV: ${process.env.BABEL_ENV}`,
    })

  return project
}
