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

  public plugin = {
    name: `WordPressDependenciesWebpackPlugin`,
    stage: Infinity,
  }

  public requested: Map<string, Set<string>>

  public constructor(public options?: Options) {
    if (!this.options.outputPath)
      this.options.outputPath = `wordpress.json`

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
    if (!obj.has(key)) {
      obj.set(key, new Set([item]))
      return
    }

    obj.set(key, obj.get(key).add(item))
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

      if (this.options.emitWordPressJson) {
        compilation.hooks.processAssets.tapPromise(
          this.plugin,
          async () => {
            this.extractDependenciesFromCompilation(compilation)

            compilation.emitAsset(
              this.options.outputPath,
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
    if (!name || !userRequest || !this.requested.has(userRequest)) return

    for (const request of this.requested.get(userRequest)) {
      if (!wordpress.isProvided(request)) continue

      this.addItemToMap(this.dependencies, name, handle.transform(request))
    }
  }

  /**
   * Tap entrypoints manifest object
   */
  @bind
  public tapEntrypointsManifestObject(entrypoints: Entrypoints) {
    for (const [ident, entrypoint] of entrypoints.entries())
      if (this.dependencies.has(ident))
        for (const dependency of this.dependencies.get(ident))
          entrypoint.has(`dependencies`)
            ? entrypoint.get(`dependencies`).add(dependency)
            : entrypoint.set(`dependencies`, new Set([dependency]))

    return entrypoints
  }
}
