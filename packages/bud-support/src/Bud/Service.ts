import type {Bud} from '@roots/bud-typings'

export abstract class Service {
  public _bud: Bud.Ref

  public constructor(bud: Bud) {
    this._bud = bud.get
  }

  public get bud(): Bud {
    return this._bud()
  }

  public set bud(bud: Bud) {
    this.bud = bud
  }
}
