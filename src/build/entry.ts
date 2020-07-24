import type {
  Bud,
  BuilderConstructor,
  EntryBuilder,
} from './types'

/**
 * Entrypoints
 */
const entry: BuilderConstructor = (
  bud: Bud,
): EntryBuilder => ({
  bud,
  options: {
    entry: bud.state.options.entry,
  },
  make: function () {
    return this.options
  },
})

export {entry}

