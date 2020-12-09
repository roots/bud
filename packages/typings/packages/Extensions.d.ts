import type {Bud, Extension, Container} from '.'

export class Contract implements Interface {
  public repository: Container

  public constructor(bud: Bud)

  public make(extensions: Container): void

  public get: (name: string) => Extension.Controller

  public getStore: () => Container

  public set: (
    name: string,
    extension: Framework.MaybeCallable,
  ) => this

  public use(pkg: string): this
}

export interface Interface {
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
  set: (name: string, extension: Framework.MaybeCallable) => this

  /**
   * Get an extension instance.
   */
  get(name: string): Extension.Controller
}
