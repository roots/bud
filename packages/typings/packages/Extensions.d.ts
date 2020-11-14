import type {Bud, Index, Extension, Container} from '.'

export class Contract implements Interface {
  public repository: Container

  public constructor(bud: Bud.Contract)

  public make(extensions: Index<Extension.Contract>): void

  public get: (name: string) => Extension.Controller

  public getStore: () => Container

  public set: (
    name: string,
    extension:
      | Extension.Contract
      | ((bud: Bud.Contract) => Extension.Contract),
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
  make(extensions: Index<Extension.Contract>): void

  /**
   * Register a plugin to be utilized during compilation.
   */
  use(pkg: string): this

  /**
   * Register an extension.
   */
  set: (
    name: string,
    extension:
      | Extension.Contract
      | ((bud: Bud.Contract) => Extension.Contract),
  ) => this

  /**
   * Get an extension instance.
   */
  get(name: string): Extension.Controller
}
