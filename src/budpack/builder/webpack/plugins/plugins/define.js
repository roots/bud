import {DefinePlugin} from 'webpack'

const define = () => ({
  setOptions: function () {
    this.options = this.bud.options.env
  },
  make: function () {
    return new DefinePlugin(this.options)
  },
  when: function () {
    return (
      this.options !== null &&
      this.options !== {} &&
      this.options !== undefined
    )
  },
})

export {define}
