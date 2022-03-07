import {Bud} from '../Bud'
import {seed} from '../seed'
import {services} from '../services'

/**
 * Create a {@link Bud} instance programatically
 *
 * @example
 * ```ts
 * const bud = factory()
 * ```
 *
 * @returns Bud instance
 *
 * @public
 */
export async function factory(overrides?: Bud.Options): Promise<Bud> {
  const options: Bud.Options = {
    name: 'bud',
    mode: 'production',
    ...(overrides ?? {}),
    services: {
      ...services,
      ...(overrides?.services ?? {}),
    },
    config: {
      ...seed,
      ...(overrides?.config ?? {}),
      location: {
        ...seed.location,
        ...(overrides?.config?.location ?? {}),
      },
    },
  }

  const project = new Bud(options)
  process.env.BABEL_ENV = project.mode
  process.env.NODE_ENV = project.mode

  project.time(project.name)

  project.log({
    message: 'process.env.NODE_ENV',
    suffix: process.env.NODE_ENV,
  })
  project.log({
    message: 'process.env.BABEL_ENV',
    suffix: process.env.NODE_ENV,
  })

  await project.lifecycle()
  return project
}
