import {Service} from '@roots/bud-framework'

export default abstract class extends Service {
  /**
   * Cache enabled
   */
  public abstract enabled(): boolean
}
