import Bud from '../../Bud'
import * as Extension from './../Extension'

export class Controller implements Interface {
  public bud: Bud
  public extensions: Bud.Index<Extension.Interface> = {}

  public constructor(bud: Bud) {
    this.bud = bud

    this.boot = this.boot.bind(this)
    this.make = this.make.bind(this)

    this.bud.on(
      'build.plugins',
      (plugins: Extension.Interface[]) =>
        plugins.filter((plugin: Extension.Interface) => plugin),
    )
  }

  public boot(definitions: Bud.Index<Extension.Factory>): void {
    /* eslint-disable-next-line */
    const ctx = this

    Object.entries(definitions).map(
      ([name, factory]: [string, Extension.Factory]) => {
        const instance: Extension.Interface = factory(ctx.bud)

        ctx.extensions[name] = instance
      },
    )
  }

  public setOptions(
    extension: string,
    options: Bud.Index<unknown>,
  ): void {
    this.extensions[extension].options = options
  }

  public make(): Extension.Product[] {
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

export interface Interface {
  bud: Bud

  extension?: Extension.Interface

  setOptions?: (
    extension: string,
    options: Bud.Index<unknown>,
  ) => void

  make(): Extension.Product[]
}
