import {Api} from '@roots/bud-typings'

export const define: Api.Define = function (values) {
  this.extensions.get('webpack-define-plugin').mergeStore(values)

  return this
}
