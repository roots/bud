import FixStyleOnlyEntriesPlugin from 'webpack-fix-style-only-entries'

import type {Extension} from './index'

const fixStyleOnlyEntries: Extension = bud => ({
  bud,

  name: 'webpack-fix-style-only-entries',

  options: bud.options.get('adapters.fixStyleOnlyEntries'),

  make: function () {
    if (this.bud.features.enabled('hot')) {
      this.options.ignore = 'webpack-hot-middleware'
    }

    return new FixStyleOnlyEntriesPlugin(this.options)
  },
  when: function () {
    return (
      this.bud.options.get('resolve.extensions').includes('.css') ||
      this.bud.options.get('resolve.extensions').includes('.scss') ||
      this.bud.options.get('resolve.extensions').includes('.sass')
    )
  },
})

export {fixStyleOnlyEntries}
