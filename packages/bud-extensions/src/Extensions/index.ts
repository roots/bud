import type Framework from '@roots/bud-typings'

import {Extension} from '../Extension'

export {Extensions}

/**
 * ## bud.extensions
 *
 * Extensions controller for the Bud framework.
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud](https://git.io/Jkli3)
 * [📦 @roots/bud-extensions](https://github.io/roots/bud-extensions)
 * [🔗 Documentation](#)
 */
class Extensions implements Framework.Extensions.Contract {
  /**
   * The Bud instance.
   */
  public bud: Framework.Bud.Ref

  /**
   * Extensions container
   */
  public repository: Framework.Container<
    Framework.Extension.Contract
  >

  /**
   * Class constructor.
   */
  public constructor(bud: Framework.Bud.Contract) {
    this.bud = bud.get

    this.make = this.make.bind(this)

    this.repository = this.bud().makeContainer<
      Framework.Extension.Contract
    >({})
  }

  /**
   * ## bud.extensions.getStore
   *
   * Returns all extensions.
   *
   * ### Usage
   *
   * ```js
   * bud.extensions.getStore()
   * ```
   */
  public getStore(): Framework.Container {
    return this.repository
  }

  /**
   * ## bud.extensions.all
   *
   * Returns all extensions.
   *
   * ### Usage
   *
   * ```js
   * bud.extensions.all()
   * ```
   */
  public all(): Framework.Container {
    return this.getStore()
  }

  /**
   * ## bud.extensions.get
   *
   * Retrieve an extension
   *
   * ### Usage
   *
   * ```js
   * bud.extensions.all()
   * ```
   */
  public get(name: string, query?: string): Extension {
    return this.repository.get(name)
  }

  /**
   * ## bud.extensions.set
   *
   * Register an extension
   *
   * ### Usage
   *
   * ```js
   * bud.extensions.set('my-extension', {make: new Plugin()})
   * ```
   */
  public set(
    name: string,
    extension: Framework.MaybeCallable<
      Framework.Extension.Contract
    >,
  ): this {
    const initialized =
      typeof extension == 'function'
        ? new Extension<unknown>(
            this.bud(),
            extension(this.bud()),
          ).initialize()
        : new Extension(this.bud(), extension).initialize()

    this.repository.set(name, initialized)

    return this
  }

  /**
   * ## bud.extensions.make
   *
   * Register extensions from a container collection.
   *
   * ### Usage
   *
   * ```js
   * const extensions = bud.makeContainer({
   *   [`my-extension`]: {
   *     make: new Plugin()
   *   },
   * })
   *
   * bud.extensions.make(extensions)
   * ```
   */
  public make(
    extensions: Framework.Container<
      Framework.Extension.Contract
    >,
  ): void {
    Object.entries(extensions).map(([name, extension]) =>
      this.set(name, extension),
    )
  }

  /**
   * ## bud.extensions.use
   *
   * Register an extension from a module name string.
   *
   * ### Usage
   *
   * ```js
   * bud.extensions.use('@roots/bud-react')
   * ```
   */
  public use(pkg: string): this {
    const path = require.resolve(pkg)

    this.bud().disk.set(pkg, {
      base: this.bud().fs.path.dirname(path),
      glob: ['**/*'],
    })

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const extension = require(path)

    this.set(pkg, extension)

    return this
  }
}
