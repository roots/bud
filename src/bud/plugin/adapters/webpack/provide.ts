import {ProvidePlugin} from 'webpack'

const provide: WebpackAdapter = () => ({
  setOptions: function () {
    return this.bud.options.auto
  },
  make: function () {
    return new ProvidePlugin(this.options)
  },
  when: function () {
    return this.options
  },
})

export {provide}
import type {WebpackAdapter} from '../..'
