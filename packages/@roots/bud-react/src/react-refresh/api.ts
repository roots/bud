import {Framework} from '@roots/bud-framework'

export const reactRefresh: Framework['reactRefresh'] = function (
  this: Framework,
  options,
) {
  this.publish({
    'extension/@pmmmwh/react-refresh-webpack-plugin/options': () =>
      options,
  })

  return this
}
