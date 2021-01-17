import {Framework, Webpack, Service} from './'

/**
 * ## bud.build
 *
 * Webpack configuration builder for the @roots/bud framework
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud/packages/server](https://git.io/JkCQG)
 * [📦 @roots/bud-server](https://www.npmjs.com/package/@roots/bud-build)
 * [🔗 Documentation](#)
 */
export interface Build extends Service {
  /**
   * ## bud.build.make
   *
   * Produce a final webpack config.
   */
  make(): Webpack.Configuration
}

export namespace Build {
  export type Builder = (
    this: Framework,
    config: Service,
  ) => Partial<Webpack.Configuration>
}
