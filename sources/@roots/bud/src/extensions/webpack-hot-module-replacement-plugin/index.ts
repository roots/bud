import {Extension} from '@roots/bud-framework/extension'
import {
  development,
  label,
  plugin,
} from '@roots/bud-framework/extension/decorators'
import {HotModuleReplacementPlugin} from 'webpack'

@label('webpack:hot-module-replacement-plugin')
@plugin(HotModuleReplacementPlugin)
@development
export default class BudHMR extends Extension<
  {},
  HotModuleReplacementPlugin
> {}
