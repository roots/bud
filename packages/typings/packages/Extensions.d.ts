import type {Bud, Extension, Container} from '.'

export class Contract {
  /**
   * Extensions container
   */
  repository: Container

  /**
   * Register a batch of extensions.
   */
  make(extensions: Container): void

  /**
   * Register a plugin to be utilized during compilation.
   */
  use(pkg: string): this

  /**
   * Register an extension.
   */
  set(name: string, extension: Framework.MaybeCallable): this

  /**
   * Get an extension instance.
   */
  get(name: string): Extension.Controller

  public constructor(bud: Bud)

  public make(extensions: Container): void

  public getStore(): Container

  public use(pkg: string): this
}
