import Extension from '../Extension'
import Extensions from './Contract'
import {Service} from '@roots/bud-support'

import type {
  Framework,
  Container,
  MaybeCallable,
} from '@roots/bud-typings'

export default abstract class
  extends Service<Framework>
  implements Extensions {
  /**
   * Extensions container
   */
  public repository: Container

  /**
   * Service initializer
   */
  public init(): void {
    this.repository = this.app.makeContainer({})
  }

  /**
   * Get an extension instance.
   */
  public abstract get(name: string): Extension

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
  public abstract use(pkg: string): this

  /**
   * Create a new controller instance wrapping an extension module.
   */
  public abstract make(extensions: Container): void

  /**
   * Get all extensions.
   */
  public abstract getStore(): Container
}
