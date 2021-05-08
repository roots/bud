import {Framework} from '@roots/bud-framework'

export class Loader {
  protected _src

  public constructor(src: (app: Framework) => string) {
    this._src = src
  }

  public make(app) {
    return this._src(app)
  }
}
