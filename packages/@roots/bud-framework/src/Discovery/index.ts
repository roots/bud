import {Discovery} from '@roots/bud-typings'
import {Container} from '@roots/container'
import Service from '../Service'

export default class extends Service implements Discovery {
  /**
   * Service ident
   */
  public name = 'discover'

  /**
   * Is discover service enabled?
   */
  public get active(): boolean {
    return this.app.store.enabled('options.discover')
  }

  /**
   * Service register
   */
  public register(): void {
    this.modulePath = this.modulePath.bind(this)
  }

  /**
   * Service boot.
   */
  public boot(): void {
    this.extensions()

    this.info({
      enabled: this.active,
      extensions: this.all(),
      msg: 'Autodiscover',
    })

    this.every(
      (name: string, pkg: {name: string; path: string}) => {
        this.app.disk.make(pkg.name, {
          baseDir: pkg.path,
        })

        this.active &&
          this.app.extensions.set(name, require(name))
      },
    )
  }

  /**
   * Collected packages.
   */
  public extensions(): Container<{
    name: string
    [key: string]: string | string[]
  }> {
    this.setStore(
      this.service('disk')
        .glob.sync([
          this.modulePath('bud-*/package.json'),
          this.modulePath('**/bud-*/package.json'),
        ])
        .filter(
          (value, index, self) => self.indexOf(value) === index,
        )
        .reduce((a, pkg) => {
          const extension: {
            name: string
            [key: string]: string | string[]
          } = this.service('disk').fs.readJSONSync(pkg)

          this.info({extension})

          return extension.keywords?.includes('bud-extension')
            ? {
                ...a,
                [extension.name]: {
                  ...extension,
                  path: this.app.fs.path.dirname(pkg),
                },
              }
            : a
        }, {}),
    )

    return this.all()
  }

  /**
   * module path
   */
  protected modulePath(path?: string): string {
    const basePath = this.service('disk').path.resolve(
      this.disk('project').baseDir,
      this.app.store.get('locations.modules'),
    )
    return path
      ? this.service('disk').path.posix.join(basePath, path)
      : basePath
  }
}
