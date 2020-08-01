import FixStyleOnlyEntriesPlugin from 'webpack-fix-style-only-entries'
import type {WebpackAdapter} from './types'

const fixStyleOnlyEntries = {
  options: {
    silent: true,
  },
  make: function () {
    return new FixStyleOnlyEntriesPlugin(this.options)
  },
  when: function () {
    return (
      this.bud.features.enabled('css') ||
      this.bud.features.enabled('scss') ||
      this.bud.features.enabled('postcss') ||
      this.bud.features.enabled('scssModules') ||
      this.bud.features.enabled('cssModules')
    )
  },
}

export {fixStyleOnlyEntries}
