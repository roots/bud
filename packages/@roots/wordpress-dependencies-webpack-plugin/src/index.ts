import './interface'
import {resolve, relative} from 'path'
import Webpack, {sources} from 'webpack'
import {boundMethod as bind} from 'autobind-decorator'
import {wpPkgs} from '@roots/bud-support'

interface Manifest {
  name: string
  path: string
  publicPath: string
  modules: {[key: string]: string[]}
  entrypoints: {[key: string]: string[]}
}

interface Options {
  fileName: string
  publicPath: string
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
    publicPath: null,
    modules: {},
    entrypoints: {},
  }

  /**
   * Plugin options
   */
  public options: Options = {
    fileName: null,
    publicPath: null,
  }

  /**
   * Constructor
   */
  constructor(
    options = {fileName: 'wordpress.json', publicPath: null},
  ) {
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
      this.plugin,
      this.processAssets,
    )
  }

  /**
   * compilation => processAssets
   */
  @bind
  public processAssets(assets: Webpack.Compilation['assets']) {
    for (const [
      name,
      entry,
    ] of this.compilation.entrypoints.entries()) {
      this.compilation.chunkGraph
        .getChunkModules(entry.getEntrypointChunk())
        .forEach(module => {
          this.setManifestEntrypoint(name, module)
        })
    }

    assets[this.manifest.name] = new sources.RawSource(
      JSON.stringify(this.manifest.entrypoints),
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
   * Set manifest entrypoint
   */
  @bind
  public setManifestEntrypoint(
    name: string,
    module: Webpack.Module,
  ) {
    this.manifest.entrypoints[name] = [
      ...this.getModuleDependencies(module),
      ...this.getEntrypointDependencies(name),
    ].filter(Boolean)
  }

  @bind
  public getEntrypointDependencies(name: string) {
    return this.manifest.entrypoints[name] ?? []
  }

  @bind
  public getModuleDependencies(module: Webpack.Module) {
    return this.manifest.modules[this.getModuleId(module)] ?? []
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
