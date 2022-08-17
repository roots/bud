import {isFunction, isString} from 'lodash-es'

import type {Bud} from '../bud.js'
import type {Context} from '../config/context.js'
import type {Config} from '../index.js'

/**
 * make function interface
 *
 * @internal
 */
export interface make {
  (ident: string | Partial<Context>, tap?: (app: Bud) => Promise<Bud>): Bud
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
export const make: make = function (ident, tap) {
  const current = this as Bud
  const root = current.root

  const context: Partial<Config.Context> = isString(ident)
    ? {label: ident, basedir: root.path(`/`), root}
    : {...ident, root}

  root.hooks.action(`config.after`, async () => {
    root.children[context.label] = await root.factory(context)
    root.children[context.label].success(`constructed`)

    if (isFunction(tap)) {
      await tap(root.children[context.label])
      root.children[context.label].success(`configuration applied`)
      await root.children[context.label].api.processQueue()
    }

    await Promise.all(
      Object.values(root.children[context.label].services)
        .filter(service => isFunction(service.afterConfig))
        .map(async service => {
          await service.afterConfig(root.children[context.label])
        }),
    )

    await root.children[context.label].hooks.fire(`config.after`)
    root.children[context.label].success(`config after hook fired`)
  })

  root.log(`child prepped:`, context.label)

  return root
}
