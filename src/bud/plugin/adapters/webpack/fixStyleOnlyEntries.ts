import FixStyleOnlyEntriesPlugin from 'webpack-fix-style-only-entries'
import type {WebpackAdapter} from './types'

const fixStyleOnlyEntries: WebpackAdapter = () => ({
  options: {
    silent: true,
  },
  make: function () {
    return new FixStyleOnlyEntriesPlugin(this.options)
  },
})

export {fixStyleOnlyEntries}
