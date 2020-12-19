import {Extension} from '../Extension'
import type {
  Bud,
  Container,
  MaybeCallable,
} from '@roots/bud-typings'

export default abstract class {
  /**
   * Bud reference.
   */
  public _bud: Bud.Ref

  /**
   * Extensions container
   */
  public repository: Container

  public constructor(bud: Bud) {
    this._bud = bud.get
  }

  public get bud(): Bud {
    return this._bud()
  }

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
