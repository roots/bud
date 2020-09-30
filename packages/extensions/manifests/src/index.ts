import type Bud from '@roots/bud-types'

import WordPressExternalsWebpackPlugin from './WordPressExternalsWebpackPlugin'
import EntrypointsWebpackPlugin from './EntrypointsWebpackPlugin'
import MergedManifestWebpackPlugin from './MergedManifestWebpackPlugin'

export const EntrypointsPlugin: Bud.Plugin.Factory = bud => ({
  bud,
  make() {
    return new EntrypointsWebpackPlugin()
  },
})

export const WordPressExternalsPlugin: Bud.Plugin.Factory = bud => ({
  bud,
  make: function () {
    return new WordPressExternalsWebpackPlugin()
  },
})

export const MergedManifestPlugin: Bud.Plugin.Factory = bud => ({
  bud,
  make() {
    return new MergedManifestWebpackPlugin()
  },
})
