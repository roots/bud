import {Bud} from '../bud.js'

/**
 * make function interface
 *
 * @internal
 */
export interface make {
  (name: string, tap?: (app: Bud) => Promise<Bud>): Bud
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
export const make: make = function (name, tap) {
  const root = this as Bud

  root.log(`constructing new instance:`, name)

  root.hooks.action('event.config.after', async app => {
    root.children[name] = await root.factory({name, root})
    if (tap) {
      await tap(root.children[name])
    }
  })

  return root
}
