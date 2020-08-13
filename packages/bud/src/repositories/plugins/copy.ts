import CopyWebpackPlugin from 'copy-webpack-plugin'

const copy = () => ({
  mergeOptions: function () {
    if (this.bud.options.get('copy').patterns.length > 0) {
      return this.bud.options.get('copy')
    }
  },
  make: function () {
    return new CopyWebpackPlugin(this.options)
  },
  when: function () {
    return this.options
  },
})

export {copy}
