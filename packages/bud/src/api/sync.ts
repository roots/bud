import type {Bud, Sync} from './Types'

const sync: Sync = function ({enabled = true, options}): Bud {
  this.features.set('browsersync', enabled ?? true)
  this.options.set('browsersync', {
    ...this.options.get('browsersync'),
    ...options,
  })

  return this
}

export {sync}
