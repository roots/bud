/**
 * ## bud.register
 *
 * Register a Bud plugin
 *
 * ```js
 * bud.register('myPlugin', myPlugin)
 * ```
 */
const register: Register = function (
  name: string,
  plugin: any,
): Bud {
  const bud: Bud = this

  const registeredPlugin: RegisteredPlugin = [name, plugin]

  bud.plugin
    .controller(this)
    .initController(registeredPlugin)
    .buildPlugin()

  return this
}

export {register}

import type {Bud} from '..'
import type {RegisteredPlugin} from '../plugin'
export type Register = (name: string, plugin: any) => Bud
