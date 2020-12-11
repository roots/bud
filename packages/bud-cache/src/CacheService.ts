import type {Bud} from '@roots/bud-typings'
import {Service} from '@roots/bud-support'

export abstract class CacheService extends Service {
  public constructor(bud: Bud) {
    super(bud)
  }

  public abstract enabled(): boolean

  public abstract setCache(): void
}
