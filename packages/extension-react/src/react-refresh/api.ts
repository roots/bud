import type {Framework} from '@roots/bud-typings'

export const reactRefresh: Framework.Api.ReactRefresh = function (
  options,
) {
  this.extensions
    .get('@pmmmwh/react-refresh-webpack-plugin')
    .setStore(options)

  return this
}
