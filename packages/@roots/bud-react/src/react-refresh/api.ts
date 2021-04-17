import {Framework} from '@roots/bud-framework'

export const reactRefresh: Framework['reactRefresh'] = function (
  options,
) {
  this.publish({
    'extension/@pmmmwh/react-refresh-webpack-plugin/options': () =>
      options,
  })

  return this
}
