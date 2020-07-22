/**
 * Entrypoints
 */
const entry: BuilderConstructor = (bud: Bud): EntryBuilder => ({
  bud,
  options: {
    entry: bud.state.options.entry,
  },
  make: function () {
    return this.options
  },
})

export {entry}

import type {Bud} from '../bud'
import type {BuilderConstructor} from '.'
import {EntryBuilder} from '.'
