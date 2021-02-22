import {Framework} from '@roots/bud-framework'

export const reactRefresh: Framework['reactRefresh'] = function (
  options,
) {
  this.extensions
    .get('@pmmmwh/react-refresh-webpack-plugin')
    .set('options', options)

  return this
}
