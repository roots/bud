import {DefinePlugin} from 'webpack'
var define = function () {
  return {
    mergeOptions: function () {
      return this.bud.options.get('env')
    },
    make: function () {
      return new DefinePlugin(this.options)
    },
    when: function () {
      return this.options
    },
  }
}
export {define}
//# sourceMappingURL=define.js.map
