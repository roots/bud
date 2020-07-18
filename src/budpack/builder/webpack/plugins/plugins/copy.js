import {CopyPlugin} from 'copy-webpack-plugin'

const copy = () => ({
  setOptions: function () {
    this.options =
      this.bud.options.copy.patterns.length > 0
        ? this.bud.options.copy
        : {}
  },
  make: function () {
    return new CopyPlugin(this.options)
  },
  when: function () {
    return (
      this.options !== null &&
      this.options !== {} &&
      this.options !== undefined
    )
  },
})

export {copy}
