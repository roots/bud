import type {Bud, BuilderConstructor, EntryBuilder} from './types'

const entry: BuilderConstructor = (bud: Bud): EntryBuilder => ({
  bud,

  make: function () {
    ! this.bud.options.has('entry')
      && this.bud.glob(`*/*.(js|css|scss|vue|ts|tsx)`)

    return {
      entry: this.bud.hooks.filter(
        'filter_entry_final',
        this.bud.options.get('entry')
      )
    }
  },
})

export {entry}
