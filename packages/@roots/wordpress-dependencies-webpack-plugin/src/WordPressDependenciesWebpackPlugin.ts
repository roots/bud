import Webpack, {Compiler, Compilation} from 'webpack'
import {boundMethod as bind} from 'autobind-decorator'
import {wpPkgs} from '@roots/bud-support'

class WordPressDependenciesWebpackPlugin {
  public plugin = {
    name: 'WordPressDependenciesWebpackPlugin',
    stage: Infinity,
  }

  protected compilation: Compilation

  public fileName: string

  public manifest: WordPressDependencies.Manifest = {}

  public usedDependencies = {}

  public constructor(options?: {fileName: string}) {
    this.fileName = options?.fileName ?? 'wordpress.json'
  }

  @bind
  public apply(compiler: Compiler): void {
    compiler.hooks.normalModuleFactory.tap(
      this.plugin.name,
      this.normalModuleFactory,
    )

    compiler.hooks.thisCompilation.tap(
      this.plugin,
      compilation => {
        this.compilation = compilation
        this.compilation.hooks.processAssets.tap(
          this.plugin,
          this.processAssets,
        )
      },
    )
  }

  @bind
  public normalModuleFactory(factory) {
    factory.hooks.beforeResolve.tap(
      this.plugin.name,
      ({contextInfo, request}) => {
        const {issuer} = contextInfo

        if (!issuer) return

        this.usedDependencies = {
          ...this.usedDependencies,
          [issuer]: [
            ...(this.usedDependencies[issuer] ?? []),
            request,
          ].filter(wpPkgs.isProvided),
        }

        return
      },
    )
  }

  @bind
  public processAssets(assets: Compilation['assets']) {
    this.compilation.entrypoints.forEach(entry => {
      this.manifest[entry.name] = []

      for (const chunk of entry.chunks) {
        this.compilation.chunkGraph
          .getChunkModules(chunk)
          .forEach(({userRequest, _modules}: any) => {
            this.usedDependencies[userRequest]
              ?.map(req => wpPkgs.transform(req).enqueue)
              .forEach(req => {
                this.manifest[entry.name].push(req)
              })

            _modules?.forEach(({userRequest}) => {
              this.usedDependencies[userRequest]
                ?.map(req => wpPkgs.transform(req).enqueue)
                .forEach(req => {
                  this.manifest[entry.name].push(req)
                })
            })
          })
      }
    })

    assets[this.fileName] = new Webpack.sources.RawSource(
      JSON.stringify(this.manifest),
      true,
    )
  }
}

export {WordPressDependenciesWebpackPlugin}
