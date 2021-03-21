import {Service} from '@roots/bud-framework'

export default abstract class extends Service {
  public constructor(args) {
    super(args)
    this.enabled = this.enabled
  }

  /**
   * Cache enabled
   */
  public abstract enabled(): boolean

  /**
   * Set cache
   */
  public abstract setCache(): void

  /**
   * deserialized
   */
  public abstract deserialize(serializedStr)

  /**
   * Memoize
   */
  public abstract memoize(
    fn: CallableFunction,
    ...args: string[]
  )
}
