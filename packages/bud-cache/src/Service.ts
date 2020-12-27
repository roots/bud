import {Service} from '@roots/bud-support'
import {Framework} from '@roots/bud-typings'

export default abstract class extends Service<Framework> {
  public abstract enabled(): boolean
  public abstract setCache(): void
}
