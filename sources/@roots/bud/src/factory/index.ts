import {Config} from '@roots/bud-framework'

import {Bud} from '../Bud'
import {makeContext} from '../context'
import {extensions} from '../extensions'
import {seed} from '../seed'
import {services} from '../services'

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
export async function factory(overrides?: Config.Options): Promise<Bud> {
  const context = await makeContext()

  const options: Config.Options = {
    name: 'bud',
    mode: 'production',
    ...(overrides ?? {}),
    context: {
      ...context,
      ...(overrides?.context ?? {}),
    },
    seed: overrides?.seed ?? seed,
    services: overrides?.services ?? services,
    extensions: overrides?.extensions ?? extensions,
  }

  const project = new Bud(options)

  process.env.BABEL_ENV = project.mode
  process.env.NODE_ENV = project.mode

  project.log({
    message: `process.env.NODE_ENV: ${process.env.NODE_ENV}`,
  })
  project.log({
    message: `process.env.BABEL_ENV: ${process.env.BABEL_ENV}`,
  })

  return await project.lifecycle()
}
