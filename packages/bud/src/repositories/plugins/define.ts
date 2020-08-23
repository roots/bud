import {DefinePlugin} from 'webpack'

import type {Extension} from './index'

const define: Extension = bud => ({
  bud,

  name: 'define',

  options: bud.env.entries() ?? false,

  make: function () {
    return new DefinePlugin(this.options)
  },

  when: function () {
    return this.options
  },
})

export {define}
