import type {Bud, BuilderConstructor, EntryBuilder} from './types'

const entry = (bud: Bud) => ({
  bud,

  target: {
    entry: null,
  },

  make: function () {
    if (!this.bud.options.has('entry')) {
      this.bud.logger.warn(
        {name: 'webpack.entry', value: this.target},
        `No entrypoints found. Automatically generating.`,
      )
      this.bud.glob(`*/*.(js|css|scss|vue|ts|tsx)`)
    }

    this.target.entry = this.bud.hooks.filter(
      'webpack.entry',
      this.bud.options.get('entry'),
    )

    this.bud.logger.info(
      {name: 'webpack.entry', value: this.target},
      `webpack.entry has been generated`,
    )
    return this.target
  },
})

export {entry}
