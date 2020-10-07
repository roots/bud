import {DefinePlugin} from 'webpack'

const define: Framework.Extension.Factory = bud => ({
  bud,

  options: bud.env,

  make: function () {
    return new DefinePlugin(this.options)
  },

  when: function () {
    return this.options ? true : false
  },
})

export {define as default}
