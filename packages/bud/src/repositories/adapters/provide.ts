import {ProvidePlugin} from 'webpack'

import type {Extension} from './index'

const provide: Extension = bud => ({
  bud,

  name: 'provide-plugin',

  options: bud.options.get('auto'),

  make: function () {
    return new ProvidePlugin(this.options)
  },

  when: function () {
    return this.bud.options.has('auto')
  },
})

export {provide}
