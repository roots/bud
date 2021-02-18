import type {Framework} from '@roots/bud-framework'

export class Theme {
  public app: Framework

  public constructor(app: Framework) {
    this.app = app
  }

  public colors: Framework.Dashboard.Theme['colors'] = function (
    colors,
  ) {
    this.app.store.merge('theme.colors', colors)

    return this.app
  }
}
