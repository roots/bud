import {mergeConfig} from './mergeConfig'
import {setConfig} from './setConfig'

/**
 * bud.sass configuration utility
 */
export const sassConfig: Sass.Factory = bud => ({
  bud,
  methods: [
    ['mergeConfig', mergeConfig],
    ['setConfig', setConfig],
  ],

  init() {
    this.methods.map(
      ([name, func]) => (this[name] = func.bind(this)),
    )

    return this
  },

  next() {
    return this.bud
  },
})
