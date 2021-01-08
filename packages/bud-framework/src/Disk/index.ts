import {FileSystem} from '@roots/filesystem'
import {Service, has} from '@roots/bud-support'
import type {
  Framework,
  Container,
  Index,
} from '@roots/bud-typings'

export default class
  extends FileSystem
  implements Service<Framework> {
  /**
   * Application reference
   */
  public readonly _app: () => Framework

  /**
   * Constructor
   */
  public constructor(items: {
    app: Framework
    containers?: Index<Container['repository']>
  }) {
    super()

    this._app = items.app.get

    try {
      this.app
        .makeContainer(items.containers.disks)
        .every((name, options) => {
          this.make(name, {
            glob: ['**/*', '*'],
            baseDir: process.cwd(),
            ...options,
          })
        })
    } catch (err) {
      console.error(err)
      process.exit(1)
    }
  }

  /**
   * Register service
   */
  public register(): void {
    return
  }

  /**
   * Boot service
   */
  public boot(): void {
    return
  }

  /**
   * Application
   */
  public get app(): Framework {
    return this._app()
  }

  /**
   * Has prop?
   */
  public hasProp = function (name: string): boolean {
    return has(this, name)
  }
}
