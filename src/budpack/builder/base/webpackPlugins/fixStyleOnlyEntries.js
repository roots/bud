import FixStyleOnlyEntriesPlugin from 'webpack-fix-style-only-entries'

const fixStyleOnlyEntries = () => ({
  options: {
    silent: true,
  },
  make: function () {
    return new FixStyleOnlyEntriesPlugin(this.options)
  },
})

export {fixStyleOnlyEntries}
