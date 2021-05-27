import './interface'
import {resolve, relative} from 'path'
import Webpack from 'webpack'
import {boundMethod as bind} from 'autobind-decorator'
import {wpPkgs} from '@roots/bud-support'
import {union} from 'lodash'

interface Manifest {
  name: string
  path: string
  modules: {[key: string]: string[]}
  entrypoints: {[key: string]: string[]}
}

interface Options {
  fileName: string
}

/**
 * Dependencies Webpack Plugin
 *
 * Aggregates the Acorn parser's AST for wordpress modules
 * and aggregates enqueue handles in `wordpress.json`.
 */
export class Plugin {
  /**
   * Plugin ident
   */
  public plugin = {
    name: 'WordPressDependenciesWebpackPlugin',
    stage: Infinity,
  }

  /**
   * Webpack compiler
   */
  public compiler: Webpack.Compiler
  public compilation: Webpack.Compilation

  /**
   * Plugin manifest
   */
  public manifest: Manifest = {
    name: null,
    path: null,
    modules: {},
    entrypoints: {},
  }

  /**
   * Plugin options
   */
  public options: Options = {
    fileName: null,
  }

  /**
   * Constructor
   */
  constructor(options = {fileName: 'wordpress.json'}) {
    Object.assign(this.options, options)
  }

  /**
   * Apply
   *
   * @see Webpack.Plugin['apply']
   */
  @bind
  apply(compiler: Webpack.Compiler): void {
    this.compiler = compiler

    this.manifest.path = resolve(
      this.compiler.options.output.path,
      this.options.fileName,
    )

    this.manifest.name = relative(
      this.compiler.options.output.path,
      this.manifest.path,
    )

    this.compiler.hooks.normalModuleFactory.tap(
      this.plugin.name,
      this.normalModuleFactory,
    )

    this.compiler.hooks.thisCompilation.tap(
      this.plugin,
      this.compile,
    )
  }

  /**
   * compilation
   */
  @bind
  public compile(compilation) {
    this.compilation = compilation

    this.compilation.hooks.processAssets.tap(
      {...this.plugin, additionalAssets: true},
      this.processAssets,
    )
  }

  /**
   * compilation => processAssets
   */
  @bind
  public processAssets() {
    this.compilation.entrypoints.forEach(entry => {
      this.getEntrypointDeps(entry).map(dep => {
        this.manifest.entrypoints[entry.name] =
          union(this.manifest.entrypoints[entry.name], dep) ?? []
      })
    })

    this.compilation.assets[this.manifest.name] =
      new Webpack.sources.RawSource(
        JSON.stringify({...this.manifest.entrypoints}),
        true,
      )
  }

  /**
   * Get module ident
   */
  @bind
  public getModuleId(module: Webpack.Module) {
    return module.identifier().split('|')[0]
  }

  /**
   * Get merged css modules
   */
  @bind
  public getEntrypointDeps(entry: {
    chunks: Webpack.Chunk[]
    origins: any[]
  }): string[] {
    const deps = []

    for (const chunk of entry.chunks) {
      this.compilation.chunkGraph
        .getChunkModules(chunk)
        .forEach(module => {
          deps.push(
            this.manifest.modules[this.getModuleId(module)],
          )
        })
    }

    return deps.filter(Boolean)
  }

  /**
   * compiler => normalModuleFactory
   */
  @bind
  public normalModuleFactory(factory) {
    factory.hooks.parser
      .for('javascript/auto')
      .tap(this.plugin.name, this.parseImports)
  }

  /**
   * Parse import
   */
  @bind
  public parseImports(parser, options) {
    parser.hooks.importSpecifier.tap(
      this.plugin.name,
      (statement, source, exportName, identifierName) => {
        if (!wpPkgs.isProvided(source)) return

        const id = this.getModuleId(parser.state.current)
        const enqueue = wpPkgs.transform(source).enqueue

        this.manifest.modules[id] = [
          ...(this.manifest.modules[id] ?? []),
          enqueue,
        ]
      },
    )
  }
}
