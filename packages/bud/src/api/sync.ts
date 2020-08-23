import type {Bud, Sync} from './types'

const sync: Sync = function ({enabled = true, options}): Bud {
  this.features.set('adapters.browsersync', enabled ?? true)
  this.webpack.set('plugins.browsersync', {
    ...this.webpack.get('plugins.browsersync'),
    ...options,
  })

  return this
}

export {sync}
