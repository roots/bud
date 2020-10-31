import {lodash as _} from '@roots/bud-support'

export const addPlugin: Framework.API.AddPlugin = function (
  make: Framework.Extension.Make | Framework.Webpack.Plugin,
  when?: Framework.Extension.When | boolean,
) {
  const args = {
    make: !_.isFunction(make) ? () => make : make,
    when: !_.isFunction(when) ? () => when ?? true : when,
  }

  this.extensions.register(name, args)

  return this
}
