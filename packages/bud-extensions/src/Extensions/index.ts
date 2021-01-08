import {Extensions} from '@roots/bud-typings'
import {set} from '@roots/bud-support'
import Extension from './Extension'
import Service from './Service'

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
export default class extends Service implements Extensions {
  /**
   * Service register
   */
  public register(): void {
    this.setStore(this.extensions)
  }

  /**
   * Service boot
   */
  public boot(): void {
    this.getEntries().map(([name, ext]) => {
      this.set<Extension>(name, ext)
    })
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
  public set<T = Extension>(name: string, extension: T): this {
    set(
      this.repository,
      name,
      new Extension({
        app: this.app,
        extension,
      }).init(),
    )

    return this
  }

  /**
   * ## bud.extensionensions.use [🏠 Internal]
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

    this.app.disk.set(pkg, {
      base: this.app.disk.path.dirname(path),
      glob: ['**/*'],
    })

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    this.set<Extension>(pkg, require(path))

    return this
  }
}
