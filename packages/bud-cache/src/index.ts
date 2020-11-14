import Framework from '@roots/bud-typings'

export class Cache implements Framework.Cache.Contract {
  public bud: Framework.Bud.Contract

  constructor(bud: Framework.Bud.Contract) {
    this.bud = bud
  }

  public setCache(): void {
    this.bud.features.enabled('buildCache') &&
      this.bud.fs.exists(
        this.bud.config.get('webpack.recordsPath'),
      ) &&
      this.bud.hooks.on(
        'webpack.cache',
        (bud: Framework.Bud.Contract) =>
          bud.disk
            .get('project')
            .readJson(
              this.bud.config.get('webpack.recordsPath'),
            ),
      )
  }
}
