import FixStyleOnlyEntriesPlugin from 'webpack-fix-style-only-entries'
import type {Plugin} from '@roots/bud-framework'

const fixStyleOnlyEntries: Plugin = bud => ({
  bud,

  options: bud.options.get('webpack.plugins.fixStyleOnlyEntries'),

  make: function () {
    if (this.bud.features.enabled('hot')) {
      this.options.ignore = 'webpack-hot-middleware'
    }

    return new FixStyleOnlyEntriesPlugin(this.options)
  },
  when: function () {
    return (
      this.bud.options
        .get('webpack.resolve.extensions')
        .includes('.css') ||
      this.bud.options
        .get('webpack.resolve.extensions')
        .includes('.scss') ||
      this.bud.options
        .get('webpack.resolve.extensions')
        .includes('.sass')
    )
  },
})

export {fixStyleOnlyEntries}
