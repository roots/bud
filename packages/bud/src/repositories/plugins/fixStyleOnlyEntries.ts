import FixStyleOnlyEntriesPlugin from 'webpack-fix-style-only-entries'
import type {WebpackAdapter} from './types'

const fixStyleOnlyEntries = () => ({
  options: {
    silent: true,
  },
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
