import type {Bud, Index} from '@roots/bud-typings'
import type {Indexed} from '@roots/container'
import {Extension} from '../Extension'

export {Extensions}

/**
 * Boots and handles extension lifecycle concerns.
 */
class Extensions implements Extensions.Contract {
  /**
   * The Bud instance.
   */
  public bud: Bud

  /**
   * Extensions container
   */
  public extensions: Indexed<Extension.Controller>

  /**
   * Creates an instance of Controller.
   */
  public constructor(bud: Bud) {
    this.bud = bud

    this.make = this.make.bind(this)

    this.extensions = this.bud.makeContainer()
  }

  /**
   * Get an extension instance.
   */
  public get(
    name: string,
    query?: string,
  ): Extension.Controller {
    if (!name.includes('.') || !query) {
      return this.extensions.get(name)
    }

    return this.extensions.get(name).get(name.split('.').pop())
  }

  /**
   * Register a batch of extensions.
   */
  public make(extensions: Index<Extension.Contract>): void {
    Object.entries(extensions).map(([name, extension]) =>
      this.set(name, extension),
    )
  }

  /**
   * Register a plugin to be utilized during compilation.
   */
  public use(pkg: string): this {
    const path = require.resolve(pkg)

    this.bud.disk.set(pkg, {
      baseDir: this.bud.fs.path.dirname(path),
      glob: ['**/*'],
    })

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const extension = require(path)

    this.set(pkg, extension)

    return this
  }

  /**
   * Register an extension.
   */
  public set(
    name: string,
    extension:
      | Extension.Contract
      | ((bud: Bud) => Extension.Contract),
  ): this {
    const initialized =
      typeof extension == 'function'
        ? new Extension(
            this.bud,
            extension(this.bud),
          ).initialize()
        : new Extension(this.bud, extension).initialize()

    this.extensions.set(name, initialized)

    return this
  }

  public store(): Indexed<Extension.Controller> {
    return this.extensions
  }

  /**
   * Return Bud (Fluent helper)
   */
  public next(): Bud {
    return this.bud
  }
}

declare namespace Extensions {
  export type Call<O = unknown, I = unknown> = (I) => O
  export type MaybeCall<T = unknown> = Call<T> | T

  export class Contract implements Interface {
    public extensions: Indexed

    public constructor(bud: Bud)

    public make(extensions: Index<Extension.Contract>): void

    public get: (name: string) => Extension.Controller

    public set: (
      name: string,
      extension:
        | Extension.Contract
        | ((bud: Bud) => Extension.Contract),
    ) => this

    public use(pkg: string): this

    public store(): Indexed<Extension.Controller>

    public next(): Bud
  }

  export interface Interface {
    /**
     * Extensions container
     */
    extensions: Indexed

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
        | ((bud: Bud) => Extension.Contract),
    ) => this

    /**
     * Get an extension instance.
     */
    get(name: string): Extension.Controller

    /**
     * Next
     */
    next(): Bud
  }
}
