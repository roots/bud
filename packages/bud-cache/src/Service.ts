import {Bud} from '@roots/bud-typings'

export default abstract class {
  _bud: Bud.Ref

  public constructor(bud: Bud) {
    this._bud = bud.get

    this.enabled = this.enabled.bind(this)
    this.setCache = this.setCache.bind(this)
  }

  public get bud(): Bud {
    return this._bud()
  }

  public init(): void {
    return
  }

  public abstract enabled(): boolean
  public abstract setCache(): void
}
