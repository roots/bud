import {Extension} from '../Extension'
import {Service} from '@roots/bud-support'
import type {
  Bud,
  Container,
  MaybeCallable,
} from '@roots/bud-typings'

/**
 * Extensions
 */
export abstract class ExtensionsService extends Service {
  /**
   * Extensions container
   */
  public repository: Container

  /**
   * Class constructor.
   */
  public constructor(bud: Bud) {
    super(bud)
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
