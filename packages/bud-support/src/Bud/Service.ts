import type {Bud} from '@roots/bud-typings'

class Service {
  public bud: Service.Container

  public constructor(bud: Bud) {
    this.bud = bud.get
  }
}

declare namespace Service {
  export type Container = Bud.Ref
}

export {Service}
