import Framework from '@roots/bud-typings'

export class Cache implements Framework.Cache.Contract {
  public bud: Framework.Bud.Ref

  constructor(bud: Framework.Bud.Contract) {
    this.bud = bud.get
  }

  public setCache(): void {
    const bud = this.bud()

    bud.features.enabled('buildCache') &&
      bud.fs.exists(bud.config.get('webpack.recordsPath')) &&
      bud.hooks.on(
        'webpack.cache',
        (bud: Framework.Bud.Contract) =>
          bud.disk
            .get('project')
            .readJson(bud.config.get('webpack.recordsPath')),
      )
  }
}
