import * as Extension from '../../../Extend/Extension'
import {DllPlugin, DllReferencePlugin} from 'webpack'

const dll: Extension.Factory = bud => ({
  bud,

  options: {
    context: bud.store['build'].context,
    name: '[name]-[hash]',
    path: bud.dist('/library/[name].json'),
  },

  make: function (): DllPlugin {
    return new DllPlugin(this.options)
  },

  when: function () {
    const {library} = this.bud.store['build']['entry']
    const {library: enabled} = this.bud.store['features']

    return library && enabled
  },
})

const dllReference: Extension.Factory = bud => ({
  bud,

  options: {
    context: bud['build']['context'],
    manifest: require(bud.dist('library/manifest.json')),
    scope: 'xyz',
    sourceType: 'commonjs2',
  },

  make: function (): DllReferencePlugin {
    return new DllReferencePlugin(this.options)
  },

  when: function () {
    const {library} = this.bud.store['build']['entry']
    const {library: enabled} = this.bud.store['features']

    return library && enabled
  },
})

export {dll, dllReference}
