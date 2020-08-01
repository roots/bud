import type {Bud, BuilderConstructor, EntryBuilder} from './types'

/**
 * Entrypoints
 */
const entry: BuilderConstructor = (bud: Bud): EntryBuilder => ({
  bud,
  options: {},
  make: function () {
    if (!this.bud.options.has('entry')) {
      this.bud.glob(`*/*.(js|css|scss|vue|ts|tsx)`)
    }

    this.options.entry = this.bud.options.get('entry')

    return this.bud.hooks.filter('filter_entry_final', this.options)
  },
})

export {entry}
