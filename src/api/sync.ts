import type {Bud, Sync} from './Types'

const sync: Sync = function ({enabled = true, options}): Bud {
  this.features.set('browserSync', enabled ?? true)

  this.features.enabled('browserSync') && this.options.merge('browserSync', options)

  return this
}

export {sync}
