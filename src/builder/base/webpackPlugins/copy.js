import CopyWebpackPlugin from 'copy-webpack-plugin'

const copy = () => ({
  setOptions: function () {
    if (this.bud.options.copy.patterns.length > 0) {
      return this.bud.options.copy
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
