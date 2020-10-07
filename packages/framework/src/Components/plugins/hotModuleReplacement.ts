import {HotModuleReplacementPlugin} from 'webpack'

const hotModuleReplacement: Framework.Extension.Factory = bud => ({
  bud,

  make: function () {
    return new HotModuleReplacementPlugin()
  },

  when: function () {
    return this.bud.store['features'].enabled('hot')
  },
})

export {hotModuleReplacement as default}
