import type {EntrypointsWebpackPlugin} from '@roots/entrypoints-webpack-plugin'

import {bind} from 'helpful-decorators'
import Webpack from 'webpack'

import * as wordpress from './packages.js'

interface Data {
  [key: string]: any
}

export interface Options {
  emitWordPressJson: boolean
  entrypointsPlugin?: typeof EntrypointsWebpackPlugin
  outputPath?: string
}

export default class WordPressDependenciesWebpackPlugin {
  public data: Data = {}

  public plugin = {
    name: `WordPressDependenciesWebpackPlugin`,
    stage: Infinity,
  }

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
   * Apply plugin
   */
  @bind
  public apply(compiler: Webpack.Compiler): void {
    compiler.hooks.normalModuleFactory.tap(this.plugin.name, factory => {
      factory.hooks.beforeResolve.tap(
        this.plugin.name,
        ({contextInfo, request}) => {
          const {issuer} = contextInfo

          this.data[issuer] = [
            ...(this.data[issuer] ?? []),
            request,
          ].filter(wordpress.isProvided)
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
        compilation.hooks.processAssets.tapAsync(
          this.plugin,
          async (assets, callback) => {
            this.tapCompilation(compilation)
            compilation.emitAsset(
              this.options.outputPath,
              new compiler.webpack.sources.RawSource(
                JSON.stringify(this.data, null, 2),
              ),
            )

            callback()
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
    compilation.entrypoints.forEach(entry => {
      const {name} = entry
      const value = this.data[name] ?? new Set([])

      for (const chunk of entry.chunks) {
        compilation.chunkGraph
          .getChunkModules(chunk)
          .forEach(({modules, userRequest}: any) => {
            this.data[userRequest]?.forEach((request: string) => {
              value.add(wordpress.transform(request).enqueue)
            })
            modules?.forEach(({userRequest}) => {
              this.data[userRequest]?.forEach((request: string) => {
                value.add(wordpress.transform(request).enqueue)
              })
            })
          })
      }

      Object.assign(this.data, {[name]: value})
    })
  }

  /**
   * Tap entrypoints manifest object
   */
  @bind
  public tapEntrypointsManifestObject(
    assets: Webpack.Compilation['assets'],
  ) {
    return Object.entries(assets).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: {...value, ...{dependencies: [...this.data[key]]}},
      }),
      {},
    )
  }
}
