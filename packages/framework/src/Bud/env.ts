import Bud from './index'

const env = function (this: Bud): Bud.Env {
  const env = this.store['env']

  Object.freeze(env)

  return env
}

export {env as default}
