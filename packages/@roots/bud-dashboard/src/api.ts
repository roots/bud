import {Framework} from '@roots/bud-framework'
import DashboardTheme from '@roots/ink-use-style'

export class Theme {
  public app: Framework

  public constructor(app: Framework) {
    this.app = app
  }

  public colors(colors: DashboardTheme.Theme.Colors) {
    this.app.store.merge('theme.colors', colors)

    return this.app
  }
}
