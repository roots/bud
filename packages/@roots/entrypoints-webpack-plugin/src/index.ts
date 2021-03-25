import {RawSource} from 'webpack-sources'
import Webpack from 'webpack'
import {resolve, relative} from 'path'
import {SyncWaterfallHook} from 'tapable'

export class Plugin {
  /**
   * Plugin ident
   */
  public plugin = {
    name: 'EntrypointsManifestPlugin',
    stage: Infinity,
  }

  /**
   * Compilation context.
   */
  public context: Webpack.compilation.Compilation['context']

  /**
   * Hook: webpack compilation output.
   */
  public hook = ['compilation', 'output']

  /**
   * Build hash
   */
  public hash: Webpack.compilation.Compilation['hash']

  /**
   * Emitted filename
   */
  public name: string

  /**
   * Emitted file path
   */
  public path: string

  /**
   * Emitted file
   */
  public file: string

  /**
   * Public path of emitted assets
   */
  public publicPath: string

  /**
   * Where should the entrypoints manifest be emitted?
   */
  public outputPath: string

  /**
   * Emitted contents
   */
  public output: EntrySchema = {}

  /**
   * Should manifest be emitted
   */
  public writeToFileEmit: boolean

  /**
   * Class constructor
   */
  constructor(
    options: Options = {
      name: 'entrypoints.json',
      writeToFileEmit: true,
      publicPath: null,
      outputPath: null,
    },
  ) {
    Object.assign(this, options)

    this.emit = this.emit.bind(this)
    this.apply = this.apply.bind(this)
    this.entrypoints = this.entrypoints.bind(this)
  }

  /**
   * Webpack apply plugin
   */
  apply(compiler: Webpack.Compiler): void {
    this.publicPath =
      this.publicPath ?? compiler.options.output.publicPath

    this.outputPath =
      this.outputPath ?? compiler.options.output.path

    this.path = resolve(this.outputPath, this.name)
    this.file = relative(this.outputPath, this.path)

    compiler.hooks.emit.tapAsync(this.plugin, this.emit)
  }

  /**
   * Emit manifest
   */
  async emit(
    compilation: Webpack.compilation.Compilation,
    callback: () => void,
  ): Promise<void> {
    const {
      assets,
      entrypoints,
      hooks,
      hash,
    }: {
      assets: Webpack.compilation.Compilation['assets']
      entrypoints: Webpack.compilation.Compilation['entrypoints']
      hooks: any // Webpack.compilation.Compilation['hooks']
      hash?: Webpack.compilation.Compilation['hash']
    } = compilation

    this.hash = hash ?? null

    hooks.entrypoints = new SyncWaterfallHook(this.hook)
    hooks.entrypoints.tap(this.plugin, this.entrypoints)
    hooks.entrypoints.call(entrypoints, this.output)

    if (this.writeToFileEmit) {
      assets[this.file] = new RawSource(
        JSON.stringify(this.output),
      )
    }

    callback()
  }

  /**
   * Map entrypoints to output
   */
  public entrypoints(
    entrypoints: SyncWaterfallHook['call']['arguments'],
  ): void {
    try {
      entrypoints.forEach(({name, chunks, ...entry}) => {
        chunks.map(({files}) => {
          this.output[name] = files.reduce(
            (a, file) => {
              const type = file.split('.').pop()

              return {
                ...(a ?? {}),
                [type]: file.includes('hot-update')
                  ? {
                      ...(a?.[type] ?? {}),
                    }
                  : {
                      ...(a?.[type] ?? {}),
                      [name]: `${this.publicPath}${file}`,
                    },
              }
            },

            entry.runtimeChunk?.files.reduce(
              (
                a: {[key: string]: any},
                file: {[key: string]: any},
              ) => {
                const type = file.split('.').pop()

                return {
                  ...(a ?? {}),
                  [type]: {
                    ...(a[type] ?? {}),
                    [entry.runtimeChunk
                      .name]: `${this.publicPath}${file}`,
                  },
                }
              },
              {},
            ),
          )
        })
      })
    } catch (err) {
      console.error(err)
    }
  }
}

/**
 * Schema for manifest entry
 */
export type EntrySchema = {
  [key: string]: {
    [type: string]: {
      [handle: string]: string
    }
  }
}

/**
 * Literally the same
 * @todo transition to EntrySchema
 * @deprecated
 */
export type Output = EntrySchema

/**
 * Constructor params
 */
export type Options = {
  name?: string
  writeToFileEmit?: boolean
  publicPath?: string
  outputPath?: string
}
