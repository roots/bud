import type {Bud, BuilderConstructor, EntryBuilder} from './types'

/**
 * Entrypoints
 */
const entry: BuilderConstructor = (bud: Bud): EntryBuilder => ({
  bud,
  options: {
    entry: {
      ...bud.state.options.get('entry'),
    },
  },
  make: function () {
    return this.bud.hooks.filter('filter_entry_final', this.options)
  },
})

export {entry}
