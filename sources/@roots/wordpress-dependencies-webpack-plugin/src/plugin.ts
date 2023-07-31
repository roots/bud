import type {
  Entrypoints,
  EntrypointsWebpackPlugin,
} from '@roots/entrypoints-webpack-plugin'
import type {Compilation} from 'webpack'

import {handle, wordpress} from '@roots/wordpress-transforms'
import {bind} from 'helpful-decorators'
import Webpack from 'webpack'

export interface Options {
  emitWordPressJson: boolean
  entrypointsPlugin?: typeof EntrypointsWebpackPlugin
  outputPath?: string
}

export default class WordPressDependenciesWebpackPlugin {
  public dependencies: Map<string, Set<string>>

  public outputPath: string

  public plugin = {
    name: `WordPressDependenciesWebpackPlugin`,
    stage: Infinity,
  }

  public requested: Map<string, Set<string>>

  public constructor(public options: Options = {emitWordPressJson: true}) {
    this.outputPath = this.options.outputPath ?? `wordpress.json`

    if (
      typeof this.options.emitWordPressJson === `undefined` &&
      !this.options.entrypointsPlugin
    )
      this.options.emitWordPressJson = true

    this.dependencies = new Map()
    this.requested = new Map()
  }

  /**
   * Add item to set in map
   *
   * @remarks
   * Works for both our map of requests and our map of dependencies.
   */
  public addItemToMap(
    obj: Map<string, Set<string>>,
    key: string,
    item: string,
  ) {
    const items = obj.get(key)
    if (!items) {
      obj.set(key, new Set([item]))
      return
    }

    obj.set(key, items.add(item))
  }

  /**
   * Apply plugin
   */
  @bind
  public apply(compiler: Webpack.Compiler): void {
    compiler.hooks.normalModuleFactory.tap(this.plugin.name, factory => {
      factory.hooks.beforeResolve.tap(
        this.plugin.name,
        ({contextInfo, request}) => {
          this.addItemToMap(this.requested, contextInfo.issuer, request)
        },
      )
    })

    compiler.hooks.thisCompilation.tap(this.plugin, compilation => {
      if (!this.options) return

      if (this.options.entrypointsPlugin) {
        const hooks =
          this.options.entrypointsPlugin.getCompilationHooks(compilation)

        hooks.compilation.tap(
          this.plugin.name,
          this.extractDependenciesFromCompilation,
        )
        hooks.entrypoints.tap(
          this.plugin.name,
          this.tapEntrypointsManifestObject,
        )
      }

      if (this.options?.emitWordPressJson) {
        compilation.hooks.processAssets.tapPromise(
          this.plugin,
          async () => {
            this.extractDependenciesFromCompilation(compilation)

            compilation.emitAsset(
              this.outputPath,
              new compiler.webpack.sources.RawSource(
                JSON.stringify(this.dependencies, null, 2),
              ),
            )
          },
        )
      }
    })
  }

  @bind
  public extractDependenciesFromCompilation(compilation: Compilation) {
    for (const {chunks, name} of compilation.entrypoints.values()) {
      if (!name) continue

      for (const chunk of chunks) {
        const records: any = compilation.chunkGraph.getChunkModules(chunk)

        for (const {userRequest} of records) {
          this.processChunkRequest(name, userRequest)
        }

        for (const {modules} of records) {
          if (!modules) continue

          for (const {userRequest} of modules) {
            this.processChunkRequest(name, userRequest)
          }
        }
      }
    }
  }

  /**
   * Add mapped request to entrypoint manifest object
   */
  @bind
  public processChunkRequest(name: string, userRequest: string) {
    if (!name || !userRequest) return

    const requested = this.requested.get(userRequest)
    if (!requested) return

    for (const request of requested) {
      if (!wordpress.isProvided(request)) continue

      const wordPressHandle = handle.transform(request)
      if (!wordPressHandle) continue
      this.addItemToMap(this.dependencies, name, wordPressHandle)
    }
  }

  /**
   * Tap entrypoints manifest object
   */
  @bind
  public tapEntrypointsManifestObject(entrypoints: Entrypoints) {
    for (const [ident, entrypoint] of entrypoints.entries()) {
      const dependencies = this.dependencies.get(ident)

      if (!dependencies) {
        entrypoint.set(`dependencies`, new Set())
        continue
      }

      for (const dependency of dependencies) {
        const entrypointDependencies = entrypoint.get(`dependencies`)
        if (!entrypointDependencies) {
          entrypoint.set(`dependencies`, new Set([dependency]))
          continue
        }

        entrypointDependencies.add(dependency)
      }
    }

    return entrypoints
  }
}
