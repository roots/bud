import {ProvidePlugin} from 'webpack'

const provide = () => ({
  setOptions: function () {
    this.options = this.bud.options.auto
  },
  make: function () {
    return new ProvidePlugin(this.options)
  },
  when: function () {
    return (
      this.options !== null &&
      this.options !== {} &&
      this.options !== undefined
    )
  },
})

export {provide}
