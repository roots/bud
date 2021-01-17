import {Service} from '@roots/bud-framework'

export default abstract class extends Service {
  /**
   * Cache enabled
   */
  public abstract enabled(): boolean

  /**
   * Set cache
   */
  public abstract setCache(): void

  /**
   * Service register
   */
  public register(): void {
    //
  }

  /**
   * Service boot
   */
  public boot(): void {
    //
  }
}
