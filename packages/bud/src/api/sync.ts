import type {Bud, Sync} from './Types'

const sync: Sync = function ({enabled = true, options}): Bud {
  this.features.set('adapters.browsersync', enabled ?? true)
  this.options.set('adapters.browsersync', {
    ...this.options.get('adapters.browsersync'),
    ...options,
  })

  return this
}

export {sync}
