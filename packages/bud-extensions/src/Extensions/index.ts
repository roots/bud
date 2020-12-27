import Extension from '../Extension'
import Service from './Service'
import {isFunction, set} from '@roots/bud-support'
import type {
  Extensions,
  Container,
  Module,
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
export default class extends Service implements Extensions {
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
    extension: MaybeCallable<Module>,
  ): this {
    set(
      this.repository,
      name,
      new Extension({
        app: this.app,
        module: isFunction(extension)
          ? extension(this.app)
          : extension,
      }),
    )

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
  public async use(pkg: string): Promise<this> {
    const path = require.resolve(pkg)

    this.app.disk.set(pkg, {
      base: this.app.fs.path.dirname(path),
      glob: ['**/*'],
    })

    const extension = await import(path)

    this.set(pkg, extension)

    return this
  }
}
