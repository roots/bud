import {Api} from '@roots/bud-typings'

export const define: Api.Define = function (values) {
  this.extensions.merge('webpack-define-plugin.options', values)

  return this
}
