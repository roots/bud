import {mergeConfig} from './mergeConfig'
import {setConfig} from './setConfig'
import {setPlugins} from './setPlugins'
import {mergePlugins} from './mergePlugins'
import {addPlugin} from './addPlugin'
import {setParser} from './setParser'
import {setSyntax} from './setSyntax'

/**
 * bud.sass configuration utility
 */
export const postcssConfig: PostCss.Factory = bud => ({
  bud,

  methods: [
    ['mergeConfig', mergeConfig],
    ['setConfig', setConfig],
    ['addPlugin', addPlugin],
    ['mergePlugins', mergePlugins],
    ['setPlugins', setPlugins],
    ['setParser', setParser],
    ['setSyntax', setSyntax],
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
