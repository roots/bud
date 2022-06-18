import RefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import type {ReactRefreshPluginOptions as Options} from '@pmmmwh/react-refresh-webpack-plugin/types/lib/types'
import {Extension} from '@roots/bud-framework/extension'
import {
  development,
  label,
  options,
  plugin,
} from '@roots/bud-framework/extension/decorators'

@label('@pmmmwh/react-refresh-webpack-plugin')
@plugin(RefreshPlugin)
@options({overlay: false})
@development
class BudReactRefresh extends Extension<Options, RefreshPlugin> {}

export default BudReactRefresh
