import {ProvidePlugin} from 'webpack'

const provide: Framework.Extension.Factory = bud => ({
  bud,

  options: {},

  make: function () {
    return new ProvidePlugin(this.options)
  },
})

export {provide as default}
