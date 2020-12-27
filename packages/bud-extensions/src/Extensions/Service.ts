import {ServiceContainer} from '@roots/bud-support'
import type {
  Extensions,
  Framework,
  MaybeCallable,
  Container,
} from '@roots/bud-typings'

export default abstract class
  extends ServiceContainer<Framework>
  implements Extensions {
  /**
   * Register an extension.
   */
  public abstract set(
    name: string,
    extension: MaybeCallable,
  ): this

  /**
   * Register a plugin to be utilized during compilation.
   */
  public abstract use(pkg: string): Promise<this>

  /**
   * Create a new controller instance wrapping an extension module.
   */
  public abstract make(extensions: Container): void
}
