import type {Bud} from './index'

/**
 * Freezes envvars.
 *
 * @this Bud
 * @return {Bud.Index<unknown>}
 */
const env = function (this: Bud): Framework.Env {
  const env = this.store['env']

  Object.freeze(env)

  return env
}

export {env}
