import type {Bud} from '@roots/bud-typings'
import {Indexed} from '@roots/container'
import {Webpack} from '@roots/bud-typings'

export class Cache {
  public bud: Bud
  public options: Indexed

  constructor(bud: Bud) {
    this.bud = bud
  }

  public setCache(): void {
    this.bud.features.enabled('buildCache') &&
      this.bud.fs.exists(
        this.bud.config.get('webpack.recordsPath'),
      ) &&
      this.bud.hooks.on<Webpack.Configuration['cache']>(
        'webpack.cache',
        () =>
          this.bud.disk
            .get('project')
            .readJson(
              this.bud.config.get('webpack.recordsPath'),
            ),
      )
  }
}
