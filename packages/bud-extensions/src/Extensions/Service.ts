import Extension from '../Extension'
import Extensions from './Contract'

import type {
  Framework,
  Container,
  MaybeCallable,
} from '@roots/bud-typings'

export default abstract class implements Extensions {
  /**
   * Bud reference.
   */
  public _bud: () => Framework

  /**
   * Extensions container
   */
  public repository: Container

  /**
   * Class constructor
   */
  public constructor(bud: Framework) {
    this._bud = bud.get
  }

  /**
   * Framework.Ref accessor
   */
  public get bud(): Framework {
    return this._bud()
  }

  /**
   * Service initializer
   */
  public init(): void {
    this.repository = this.bud.makeContainer({})
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
