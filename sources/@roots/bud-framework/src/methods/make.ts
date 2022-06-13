import {isString} from 'lodash-es'

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

  const options = isString(seed) ? {name: seed, root} : {...seed, root}

  root.log(`constructing new instance:`, options.name)

  root.hooks.action('event.config.after', async app => {
    root.children[options.name] = await root.factory(options)

    if (tap) {
      await tap(root.children[options.name])
    }
  })

  return root
}
