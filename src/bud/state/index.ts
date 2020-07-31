import {configs} from './configs'
import {features} from './features'
import {options} from './options'
import {paths} from './paths'
import {env} from './env'
import {plugins} from './plugins'
import {flags} from './flags'
import type {Bud, State} from './types'

/**
 * bud.state
 */
export const state: (bud: Bud) => State = bud => {
  const container = {
    paths,
    configs,
    flags,
    env,
    features,
    options,
    plugins,
    init: function (bud) {
      this.env = env(this)
      this.configs = configs(this.paths)
      this.features = features(this)
      this.options = options(this)
      this.plugins = plugins(this)

      return this
    },
  }

  const state: State = container.init(bud)

  return state
}
