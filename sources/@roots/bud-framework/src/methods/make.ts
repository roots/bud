import {isFunction, isString} from 'lodash-es'

import type {Bud} from '../bud.js'
import type {Options} from '../config/options.js'

/**
 * make function interface
 *
 * @internal
 */
export interface make {
  (seed: string | Options, tap?: (app: Bud) => Promise<Bud>): Bud
}

/**
 * Instantiate a child instance and add to {@link Bud.children} container
 *
 * @remarks
 * **make** takes two parameters:
 *
 * - The **name** of the new compiler
 * - Optional: callback to use for configuration
 *
 * @example
 * ```js
 * bud.make('scripts', async child => child.entry('app', 'app.js'))
 * ```
 *
 * @public
 */
export const make: make = function (seed, tap) {
  const current = this as Bud
  const root = current.root

  const options = isString(seed)
    ? {label: seed, dir: root.path('/'), root}
    : {...seed, root}

  root.hooks.action('config.after', async () => {
    root.children[options.label] = await root.factory(options)
    root.children[options.label].success('constructed')

    if (isFunction(tap)) {
      await tap(root.children[options.label])
      root.children[options.label].success('configuration applied')
      await root.children[options.label].api.processQueue()
    }

    await Promise.all(
      Object.values(root.children[options.label].services)
        .filter(service => isFunction(service.afterConfig))
        .map(async service => {
          await service.afterConfig(root.children[options.label])
        }),
    )

    await root.children[options.label].hooks.fire('config.after')
    root.children[options.label].success('config after hook fired')
  })

  root.log(`child prepped:`, options.label)

  return root
}
