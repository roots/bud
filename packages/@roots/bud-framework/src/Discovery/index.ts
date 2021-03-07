import {Discovery} from '@roots/bud-typings'
import {Container} from '@roots/container'
import Service from '../Service'

export default class extends Service implements Discovery {
  /**
   * Service ident
   */
  public name: string | number = 'discover'

  /**
   * Service register
   */
  public register(): void {
    this.modulePath = this.modulePath.bind(this)
    this.packages = this.packages.bind(this)
  }

  /**
   * Service boot.
   */
  public boot(): void {
    this.info({
      enabled: this.active,
      msg: 'Autodiscover enabled status',
    })

    this.active &&
      this.packages().every((name, pkg) => {
        this.service('disk').make(pkg.name, {
          baseDir: pkg.path,
        })

        this.service('extensions').set(
          name,
          require(name as string),
        )
      })
  }

  /**
   * Collected packages.
   */
  public packages(): Container<{
    name: string
    [key: string]: string | string[]
  }> {
    return this.app.makeContainer(
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
                  path: pkg,
                },
              }
            : a
        }, {}),
    )
  }

  /**
   * module path
   */
  protected modulePath(path: string): string {
    return this.service('disk').path.posix.join(
      this.service('disk').path.resolve(
        this.disk('project').baseDir,
        this.app.store.get('locations.modules'),
      ),
      path,
    )
  }

  /**
   * Is autodiscover enabled?
   */
  public get active(): boolean {
    return this.app.store.enabled('options.discover')
  }
}
