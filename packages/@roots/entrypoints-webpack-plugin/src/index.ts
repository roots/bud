import {RawSource} from 'webpack-sources'
import Webpack from 'webpack'
import {resolve, relative} from 'path'

/**
 * Entrypoints Webpack Plugin
 */
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
  public context: Webpack.Compiler['context']

  /**
   * Hook: webpack compilation output.
   */
  public readonly hook: string[] = ['compilation', 'output']

  /**
   * Build hash
   */
  public hash: Webpack.Compilation['hash']

  /**
   * Emitted filename
   */
  public name: string = 'entrypoints.json'

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
  public publicPath:
    | string
    | Webpack.Compiler['options']['output']['publicPath']

  /**
   * Emitted contents
   */
  public output = {}

  /**
   * Webpack apply plugin
   */
  apply(compiler: Webpack.Compiler): void {
    this.publicPath = compiler.options.output.publicPath
    this.path = resolve(compiler.options.output.path, this.name)
    this.file = relative(compiler.options.output.path, this.path)

    compiler.hooks.thisCompilation.tap(
      this.plugin,
      (compilation: Webpack.Compilation): void => {
        compilation.hooks.processAssets.tap(
          this.plugin,
          assets => {
            const raw = {}

            compilation.entrypoints.forEach(entry => {
              entry.chunks.map(({files}) => {
                raw[entry.name] = Array.from(files).reduce(
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
                            [entry.name]: `${this.publicPath}${file}`,
                          },
                    }
                  },
                  Array.from(
                    entry.getRuntimeChunk()?.files,
                  ).reduce((a, file) => {
                    const type = file.split('.').pop()

                    return {
                      ...(a ?? {}),
                      [type]: {
                        ...(a[type] ?? {}),
                        [entry.getRuntimeChunk()
                          .name]: `${this.publicPath}${file}`,
                      },
                    }
                  }, {}),
                )

                this.output = Object.fromEntries(
                  Object.entries(raw).filter(item => item),
                )
              })
            })
          },
        )

        compilation.hooks.afterProcessAssets.tap(
          this.plugin,
          assets => {
            assets[this.name] = new RawSource(
              JSON.stringify(this.output),
            )
          },
        )
      },
    )
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
