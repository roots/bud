import {mergeConfig} from './mergeConfig'
import {setConfig} from './setConfig'

/**
 * bud.sass configuration utility
 */
export const sass: Sass.Factory = bud => ({
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
  then() {
    return this.bud
  },
})
