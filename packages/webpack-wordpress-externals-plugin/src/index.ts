import {RawSource} from 'webpack-sources'
import Webpack, {ExternalsPlugin} from 'webpack'
import path from 'path'

import fetchExternals, {Hash} from './fetchExternals'
import {externals} from './externals'

export class Plugin {
  // Ident
  public plugin = {
    name: 'WordPressExternalsWebpackPlugin',
    stage: Infinity,
  }

  public output = {
    dir: '',
    name: '',
    file: '',
    publicPath: null,
    content: {},
  }

  public options: Options

  public externals: ExternalsPlugin

  /**
   * Class constructor
   */
  constructor(
    options: Options = {
      name: 'wordpress.json',
      writeToFileEmit: true,
      useElementAsReact: true,
    },
  ) {
    this.options = options

    this.output.name = this.options.name

    this.externals = new ExternalsPlugin(
      'wp',
      externals.bind(this),
    )

    this.emit = this.emit.bind(this)
  }

  apply(compiler: Webpack.Compiler): void {
    this.output.dir = compiler.options.output.path
    this.output.publicPath = compiler.options.output.publicPath

    this.output.file = path.resolve(
      this.output.dir,
      this.output.name,
    )

    this.output.name = path.relative(
      this.output.dir,
      this.output.file,
    )

    this.externals.apply(compiler)

    compiler.hooks.emit.tapAsync(
      this.constructor.name,
      this.emit.bind(this),
    )
  }

  public async emit(
    compilation: Webpack.compilation.Compilation,
    callback: () => void,
  ): Promise<void> {
    const externals: Hash = await fetchExternals()

    compilation.entrypoints.forEach(entry => {
      entry.chunks.forEach(chunk => {
        this.output.content[entry.name] = Array.from(
          chunk.modulesIterable,
        ).reduce(
          (acc: any, module: any) =>
            externals[module.userRequest]
              ? [...acc, externals[module.userRequest].enqueue]
              : acc,
          [],
        )
      })
    })

    compilation.assets[this.output.name] = new RawSource(
      JSON.stringify(this.output.content),
    )

    callback()
  }
}

export type EntrySchema = {
  [key: string]: string | string[]
}

export type Content = EntrySchema | EntrySchema[] | null

/**
 * Plugin options
 */
export type Options = {
  /**
   * Name of outputted file.
   */
  name: string

  /**
   * Should manifest be written to disk.
   */
  writeToFileEmit: boolean

  /**
   * Transform requests for 'react' and 'react-dom'
   * to '@wordpress/element'
   */
  useElementAsReact: boolean
}
