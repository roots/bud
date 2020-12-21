import {Framework} from '@roots/bud-typings'
import {Service} from '@roots/bud-support'

export default abstract class extends Service<Framework> {
  public abstract enabled(): boolean
  public abstract setCache(): void
  public init(): void {
    return
  }
}
