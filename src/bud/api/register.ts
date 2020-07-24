import type {Bud, Register, RegisteredPlugin} from './types'

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
