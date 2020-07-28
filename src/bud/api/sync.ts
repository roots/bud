import type {Bud, Sync} from './Types'

const sync: Sync = function ({enabled = true, options}): Bud {
  this.state.features.browserSync = enabled
  this.state.options.browserSync = {
    ...this.state.options.browserSync,
    ...options,
  }

  return this
}

export {sync}
