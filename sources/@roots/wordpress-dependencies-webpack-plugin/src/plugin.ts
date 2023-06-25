import type {EntrypointsWebpackPlugin} from '@roots/entrypoints-webpack-plugin'

import {handle, isProvided} from '@roots/wordpress-transforms'
import {bind} from 'helpful-decorators'
import Webpack from 'webpack'

interface Data {
  [key: string]: any
}

export interface Options {
  emitWordPressJson: boolean
  entrypointsPlugin?: typeof EntrypointsWebpackPlugin
  outputPath?: string
}

export default class WordPressDependenciesWebpackPlugin {
  public manifestData: Data = {}

  public plugin = {
    name: `WordPressDependenciesWebpackPlugin`,
    stage: Infinity,
  }

  public requestData: Data = {}

  public constructor(public options?: Options) {
    if (!this.options.outputPath)
      this.options.outputPath = `wordpress.json`

    if (
      typeof this.options.emitWordPressJson === `undefined` &&
      !this.options.entrypointsPlugin
    )
      this.options.emitWordPressJson = true
  }

  /**
   * Add mapped request to entrypoint manifest object
   */
  @bind
  public addRequest(entryName: string, request: string) {
    if (!this.manifestData[entryName]) {
      this.manifestData[entryName] = new Set([])
    }

    this.manifestData[entryName].add(handle.transform(request))
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
          this.requestData[contextInfo.issuer] = [
            ...(this.requestData[contextInfo.issuer] ?? []),
            request,
          ]
        },
      )
    })

    compiler.hooks.thisCompilation.tap(this.plugin, compilation => {
      if (this.options.entrypointsPlugin) {
        const hooks =
          this.options.entrypointsPlugin.getCompilationHooks(compilation)

        hooks.compilation.tap(this.plugin.name, this.tapCompilation)
        hooks.entrypoints.tap(
          this.plugin.name,
          this.tapEntrypointsManifestObject,
        )
      }

      if (this.options.emitWordPressJson) {
        compilation.hooks.processAssets.tapPromise(
          this.plugin,
          async () => {
            this.tapCompilation(compilation)
            compilation.emitAsset(
              this.options.outputPath,
              new compiler.webpack.sources.RawSource(
                JSON.stringify(this.manifestData, null, 2),
              ),
            )
          },
        )
      }
    })
  }

  /**
   * Get data from compilation
   */
  @bind
  public tapCompilation(compilation: Webpack.Compilation) {
    for (const entry of compilation.entrypoints.values()) {
      for (const chunk of entry.chunks) {
        const moduleChunks = compilation.chunkGraph.getChunkModules(chunk)

        for (const {modules, userRequest} of moduleChunks as any) {
          if (this.requestData[userRequest]) {
            for (const request of this.requestData[userRequest])
              isProvided(request) && this.addRequest(entry.name, request)
          }

          if (modules) {
            for (const {userRequest} of modules) {
              if (this.requestData[userRequest]) {
                for (const request of this.requestData[userRequest])
                  isProvided(request) &&
                    this.addRequest(entry.name, request)
              }
            }
          }
        }
      }
    }
  }

  /**
   * Tap entrypoints manifest object
   */
  @bind
  public tapEntrypointsManifestObject(
    assets: Webpack.Compilation['assets'],
  ) {
    return Object.entries(assets)
      .filter(([key]) => key in this.manifestData)
      .reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: {
            ...value,
            ...{dependencies: [...this.manifestData[key]]},
          },
        }),
        {},
      )
  }
}
