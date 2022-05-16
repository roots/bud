import {Bud} from '../'

/**
 * make function interface
 *
 * @internal
 */
export interface make {
  (name: string, tap?: (app: Bud) => Bud): Promise<Bud>
}

/**
 * Instantiate a child instance and add to {@link Bud.children} container
 *
 * @remarks
 * **make** takes two parameters:
 *
 * - The **name** of the new compiler
 * - An optional callback to use for configuring the compiler.
 *
 * @example
 * ```js
 * bud.make('scripts', child => child.entry('app', 'app.js'))
 * ```
 *
 * @public
 */
export const make: make = async function (name, tap) {
  const root = this as Bud

  root.log(`constructing new instance:`, name)

  root.children[name] = await root.factory({name, root})

  if (tap) {
    tap(root.children[name])
  }

  return root
}
