import {Extension} from '../Extension'
import {ExtensionsService} from './ExtensionsService'

import type {
  Bud,
  Container,
  MaybeCallable,
} from '@roots/bud-typings'

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
export class Extensions extends ExtensionsService {
  /**
   * Class constructor.
   */
  public constructor(bud: Bud) {
    super(bud)

    this.make = this.make.bind(this)
    this.repository = this.bud().makeContainer({})
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
  public getStore(): Container {
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
  public all(): Container {
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
  public get(name: string): Extension {
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
    extension: MaybeCallable<Extension.Module>,
  ): this {
    const initialized =
      typeof extension == 'function'
        ? new Extension(
            this.bud(),
            extension(this.bud()),
          ).initialize()
        : new Extension(this.bud(), extension).initialize()

    this.repository.set(name, initialized)

    return this
  }

  /**
   * ## bud.extensions.make [🏠 Internal]
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
  public make(extensions: Container): void {
    Object.entries(extensions).map(([name, extension]) =>
      this.set(name, extension),
    )
  }

  /**
   * ## bud.extensions.use [🏠 Internal]
   *
   * Register an extension from a module name string.
   *
   * Projects shoul duse `bud.use` instead of
   * using this directly.
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
