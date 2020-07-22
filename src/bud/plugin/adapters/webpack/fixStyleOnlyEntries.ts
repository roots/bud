import FixStyleOnlyEntriesPlugin from 'webpack-fix-style-only-entries'

const fixStyleOnlyEntries: WebpackAdapter = () => ({
  options: {
    silent: true,
  },
  make: function () {
    return new FixStyleOnlyEntriesPlugin(this.options)
  },
})

export {fixStyleOnlyEntries}
import type {WebpackAdapter} from '../..'
