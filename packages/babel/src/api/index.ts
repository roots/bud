import {mergePlugins} from './mergePlugins'
import {setPlugins} from './setPlugins'
import {addPlugin} from './addPlugin'
import {mergeConfig} from './mergeConfig'
import {setConfig} from './setConfig'
import {setPresets} from './setPresets'
import {mergePresets} from './mergePresets'
import {addPreset} from './addPreset'

/**
 * bud.babel configuration utility
 */
export const babelConfig: Babel.Factory = bud => ({
  bud,
  methods: [
    ['mergeConfig', mergeConfig],
    ['setConfig', setConfig],
    ['mergePlugins', mergePlugins],
    ['setPlugins', setPlugins],
    ['addPlugin', addPlugin],
    ['mergePresets', mergePresets],
    ['setPresets', setPresets],
    ['addPreset', addPreset],
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
