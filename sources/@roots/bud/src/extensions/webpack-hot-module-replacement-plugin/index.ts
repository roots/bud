import {Extension} from '@roots/bud-framework/extension'
import {
  development,
  label,
  plugin,
} from '@roots/bud-framework/extension/decorators'
import Webpack from 'webpack'

@label('webpack:hot-module-replacement-plugin')
@plugin(Webpack.HotModuleReplacementPlugin)
@development
export default class BudHMR extends Extension<
  {},
  Webpack.HotModuleReplacementPlugin
> {}
