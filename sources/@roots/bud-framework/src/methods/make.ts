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
    ? {name: seed, dir: root.path('/'), root}
    : {...seed, root}

  root.hooks.action('config.after', async () => {
    root.children[options.name] = await root.factory(options)
    root.children[options.name].success('constructed')

    if (isFunction(tap)) {
      await tap(root.children[options.name])
      root.children[options.name].success('configuration applied')
      await root.children[options.name].api.processQueue()
    }

    await root.children[options.name].hooks.fire('config.after')
    root.children[options.name].success('config after hook fired')

    await root.children[options.name].extensions.runAll('_afterConfig')
    root.children[options.name].success('extensions afterConfig applied')
  })

  root.log(`child prepped:`, options.name)

  return root
}
