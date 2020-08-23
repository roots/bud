import {ProvidePlugin} from 'webpack'

import type {Extension} from './index'

const provide: Extension = bud => ({
  bud,

  name: 'provide-plugin',

  options: bud.env.entries(),

  make: function () {
    return new ProvidePlugin(this.options)
  },

  when: function () {
    return this.options
  },
})

export {provide}
