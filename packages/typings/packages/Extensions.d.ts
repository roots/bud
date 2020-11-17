import type {Bud, Extension, Container} from '.'

export class Contract implements Interface {
  public repository: Container<Extension.Contract>

  public constructor(bud: Bud.Contract)

  public make(extensions: Container<Extension.Contract>): void

  public get: (name: string) => Extension.Controller

  public getStore: () => Container<Extension.Contract>

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
  repository: Container<Extension.Contract>

  /**
   * Register a batch of extensions.
   */
  make(extensions: Container<Extension.Contract>): void

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
