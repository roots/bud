import type Framework from '@roots/bud-typings'

import {Extension} from '../Extension'

export {Extensions}

/**
 * Boots and handles extension lifecycle concerns.
 */
class Extensions implements Framework.Extensions.Contract {
  /**
   * The Bud instance.
   */
  public bud: Framework.Bud.Contract

  /**
   * Extensions container
   */
  public repository: Framework.Container

  /**
   * Creates an instance of Controller.
   */
  public constructor(bud: Framework.Bud.Contract) {
    this.bud = bud

    this.make = this.make.bind(this)

    this.repository = this.bud.makeContainer({})
  }

  public getStore(): Framework.Container {
    return this.repository
  }

  /**
   * Get an extension instance.
   */
  public get(name: string, query?: string): Extension {
    if (!name.includes('.') || !query) {
      return this.repository.get(name)
    }

    return this.repository.get(name).get(name.split('.').pop())
  }

  /**
   * Register a batch of extensions.
   */
  public make(
    extensions: Framework.Index<Framework.Extension.Contract>,
  ): void {
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
      base: this.bud.fs.path.dirname(path),
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
      | Framework.Extension.Contract
      | ((
          bud: Framework.Bud.Contract,
        ) => Framework.Extension.Contract),
  ): this {
    const initialized =
      typeof extension == 'function'
        ? new Extension(
            this.bud,
            extension(this.bud),
          ).initialize()
        : new Extension(this.bud, extension).initialize()

    this.repository.set(name, initialized)

    return this
  }
}
