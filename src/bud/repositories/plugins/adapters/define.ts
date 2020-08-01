import {DefinePlugin} from 'webpack'

const define = {
  mergeOptions: function () {
    return this.bud.options.get('env')
  },
  make: function () {
    return new DefinePlugin(this.options)
  },
  when: function () {
    return this.options
  },
}

export {define}
