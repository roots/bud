import {DefinePlugin} from 'webpack'
import type {Plugin} from '@roots/bud-framework'

const define: Plugin = bud => ({
  options: bud.env.entries() ?? false,
  make: function () {
    return new DefinePlugin(this.options)
  },
  when: function () {
    return this.options ? true : false
  },
})

export {define}
