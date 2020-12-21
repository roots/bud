import {Framework} from '@roots/bud-typings'

export default abstract class {
  _bud: () => Framework

  public constructor(bud: Framework) {
    this._bud = bud.get
  }

  public get bud(): Framework {
    return this._bud()
  }

  public init(): void {
    this.enabled = this.enabled.bind(this)
    this.setCache = this.setCache.bind(this)
  }

  public abstract enabled(): boolean
  public abstract setCache(): void
}
