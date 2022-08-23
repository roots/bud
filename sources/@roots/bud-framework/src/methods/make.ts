import {isString} from 'lodash-es'

import type {Bud} from '../bud.js'
import type {Context, Overrides} from '../config/context.js'

/**
 * make function interface
 *
 * @internal
 */
export interface make {
  (
    ident: string | Overrides,
    tap?: (app: Bud) => Promise<unknown>,
  ): Promise<Bud>
}

/**
 * Create a child instance and register with root instance
 *
 * @remarks
 * **bud.make** takes two parameters:
 *
 * - The **label** for the new compiler
 * - Optional: callback to use for configuration
 *
 * @example
 * ```js
 * bud.make('scripts', async child => child.entry('app', 'app.js'))
 * ```
 *
 * @public
 */
export const make: make = async function (props, tap) {
  const current = this as Bud
  const root = current.root

  const context: Context = isString(props)
    ? {...root.context, label: props, basedir: root.path(), root}
    : {...root.context, ...props, root}

  root.log(`instantiating child:`, context.label)

  const child = await root.factory(context)

  if (tap) {
    await tap(child)
    await child.hooks.fire(`config.after`)
  }

  if (!root.children) root.children = {}
  root.children[context.label] = child

  return root
}
