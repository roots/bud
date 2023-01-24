import {bind} from 'helpful-decorators'
import Webpack from 'webpack'

import * as wpPkgs from './packages.js'

interface Manifest {
  [key: string]: any
}

/**
 * @public
 */
export default class WordPressDependenciesWebpackPlugin {
  /**
   * @public
   */
  public plugin = {
    name: `WordPressDependenciesWebpackPlugin`,
    stage: Infinity,
  }

  /**
   * @public
   */
  protected compilation: Webpack.Compilation

  /**
   * @public
   */
  public fileName: string

  /**
   * @public
   */
  public manifest: Manifest = {}

  /**
   * @public
   */
  public usedDependencies = {}

  /**
   * @public
   */
  public constructor(options?: {fileName: string}) {
    this.fileName = options?.fileName ?? `wordpress.json`
  }

  /**
   * @public
   */
  @bind
  public apply(compiler: Webpack.Compiler): void {
    compiler.hooks.normalModuleFactory.tap(
      this.plugin.name,
      this.normalModuleFactory,
    )

    compiler.hooks.thisCompilation.tap(this.plugin, compilation => {
      this.compilation = compilation
      this.compilation.hooks.processAssets.tap(
        {...this.plugin, additionalAssets: true},
        this.processAssets,
      )
    })
  }

  /**
   * @public
   */
  @bind
  public normalModuleFactory(factory) {
    factory.hooks.beforeResolve.tap(
      this.plugin.name,
      ({contextInfo, request}) => {
        const {issuer} = contextInfo

        this.usedDependencies = {
          ...this.usedDependencies,
          [issuer ?? `unknown`]: [
            ...(this.usedDependencies[issuer] ?? []),
            request,
          ].filter(wpPkgs.isProvided),
        }

        return
      },
    )
  }

  /**
   * @public
   */
  @bind
  public processAssets(assets: Webpack.Compilation['assets']) {
    this.compilation.entrypoints.forEach(entry => {
      this.manifest[entry.name] = this.manifest[entry.name] ?? new Set([])

      for (const chunk of entry.chunks) {
        this.compilation.chunkGraph
          .getChunkModules(chunk)
          .forEach(({userRequest, modules}: any) => {
            this.usedDependencies[userRequest]
              ?.map((request: string) => wpPkgs.transform(request).enqueue)
              .forEach((request: string) => {
                this.manifest[entry.name].add(request)
              })

            modules?.forEach(({userRequest}) => {
              this.usedDependencies[userRequest]
                ?.map(
                  (request: string) => wpPkgs.transform(request).enqueue,
                )
                .forEach((request: string) => {
                  this.manifest[entry.name].add(request)
                })
            })
          })
      }
    })

    assets[this.fileName] = new Webpack.sources.RawSource(
      JSON.stringify(
        Object.entries(this.manifest).reduce(
          (manifest, [key, value]) => ({
            ...manifest,
            [key]: [...value],
          }),
          {},
        ),
      ),
      true,
    )
  }
}
