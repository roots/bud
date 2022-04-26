import {Extension} from '@roots/bud-framework'
import {
  bind,
  label,
  options,
  plugin,
  when,
} from '@roots/bud-framework/extension/decorators'

import * as themeJson from './api/themeJson'
import * as useTailwindColors from './api/useTailwindColors'
import {Options, ThemeJsonWebpackPlugin} from './plugin'

@label('wp-theme-json')
@options({
  path: app => app.path('./theme.json'),
  settings: {
    color: {
      custom: false,
      customGradient: false,
    },
    custom: {
      spacing: {},
      typography: {'font-size': {}, 'line-height': {}},
    },
    spacing: {
      padding: true,
      units: ['px', '%', 'em', 'rem', 'vw', 'vh'],
    },
    typography: {
      customFontSize: false,
      dropCap: false,
    },
  },
})
@when(async () => false)
@plugin(ThemeJsonWebpackPlugin)
class ThemeJson extends Extension<Options, ThemeJsonWebpackPlugin> {
  @bind
  public async register() {
    this.app.api.bindFacade('themeJson', themeJson.method)
    this.app.api.bindFacade('useTailwindColors', useTailwindColors.method)
  }
}

export default ThemeJson
