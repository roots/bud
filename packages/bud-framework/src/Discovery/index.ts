import {Container} from '@roots/container'
import Service from '../Service'

/**
 * Environment variables
 */
export default class extends Service {
  /**
   * Service register
   */
  public register(): void {}

  /**
   * Service boot.
   */
  public boot(): void {
    this.app.options.enabled('autodiscover') &&
      this.packages().every((name, pkg) => {
        this.app.disk.make(pkg.name, {
          baseDir: pkg.path,
        })

        this.app.extensions.set(name, require(name))
      })
  }

  public packages(): Container<{
    name: string
    [key: string]: string | string[]
  }> {
    return this.app.makeContainer(
      this.app.disk.glob
        .sync([
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
          } = this.app.disk.fs.readJSONSync(pkg)
          this.app.logger.info(
            {name: extension.name},
            'Autodiscovery',
          )

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

  protected modulePath(path) {
    return this.app.disk.path.posix.join(
      this.app.disk.path.resolve(
        this.app.disk.get('project').base,
        this.app.options.get('modules'),
      ),
      path,
    )
  }
}
