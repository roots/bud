import {DefinePlugin} from './externals'
import type {Plugin} from '@roots/bud-types'

const define: Plugin = bud => ({
  options: bud.env.repository ?? {},

  make: function () {
    return new DefinePlugin(this.options)
  },

  when: function () {
    return this.options ? true : false
  },
})

export {define}
