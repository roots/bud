import {Bud} from '@roots/bud-typings'

export default abstract class {
  _bud: Bud.Ref

  public constructor(bud: Bud) {
    this._bud = bud.get
  }

  public get bud(): Bud {
    return this._bud()
  }

  public init(): void {
    this.enabled = this.enabled.bind(this)
    this.setCache = this.setCache.bind(this)
  }

  public abstract enabled(): boolean
  public abstract setCache(): void
}
