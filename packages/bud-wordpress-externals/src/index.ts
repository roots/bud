import {Plugin} from '@roots/bud-typings'
import WordPressExternalsWebpackPlugin from './WordPressExternalsWebpackPlugin'

const adapter = bud => ({
  bud,
  make: function () {
    return new WordPressExternalsWebpackPlugin()
  },
})

const wordpressExternals: Plugin = bud => ({
  bud,
  make: function () {
    this.bud.plugins.set('webpack-wp-deps', adapter)
  },
})

module.exports = wordpressExternals
