import Bud from '../../Bud'

/**
 * Boots and handles extension lifecycle concerns.
 */
export class Extensions {
  /**
   * The Bud instance.
   *
   * @type {Bud}
   * @memberof Controller
   */
  public bud: Bud

  /**
   * Keyed extensions
   *
   * @type {Index<Extension>}
   * @memberof Controller
   */
  public extensions: Framework.Index<Framework.Extension> = {}

  /**
   * Creates an instance of Controller.
   *
   * @param {Bud} bud
   * @memberof Controller
   */
  public constructor(bud: Bud) {
    this.bud = bud

    this.boot = this.boot.bind(this)
    this.make = this.make.bind(this)

    this.bud.hooks.on(
      'build.plugins',
      (plugins: Framework.Extension[]) =>
        plugins.filter((plugin: Framework.Extension) => plugin),
    )
  }

  /**
   * Boot an extension.
   *
   * @param {Index<Extension.Factory>} definitions
   * @memberof Controller
   */
  public boot(
    definitions: Framework.Index<Framework.Extension.Factory>,
  ): void {
    /* eslint-disable-next-line */
    const ctx = this

    Object.entries(definitions).map(
      ([name, factory]: [
        string,
        Framework.Extension.Factory,
      ]) => {
        const instance: Framework.Extension = factory(ctx.bud)

        ctx.extensions[name] = instance
      },
    )
  }

  /**
   * Set the options on a booted extensions.
   *
   * @param {string} extension
   * @param {Index<unknown>} options
   * @memberof Controller
   */
  public setOptions(
    extension: string,
    options: Framework.Index<unknown>,
  ): void {
    this.extensions[extension].options = options
  }

  /**
   * Make an extension
   *
   * @note applies only to webpack plugins
   *
   * @returns {Extension.Product[]}
   * @memberof Controller
   */
  public make(): Framework.Extension.Product[] {
    const output = Object.values(this.extensions)
      .map(extension => {
        if (!extension.make) return

        if (!extension.when || extension.when()) {
          return extension.make()
        }
      })
      .filter(ext => ext)

    return output
  }
}
