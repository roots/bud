import {bind} from 'helpful-decorators'
import Webpack, {sources} from 'webpack'

import {Entry} from './webpack.plugin.js'

/**
 * Emits inline html for each entrypoint
 *
 * @param compilation - Webpack compilation instance
 * @param publicPath - public path for assets
 */
export class InlineEmitter {
  /**
   * Class constructor
   *
   * @param compilation - webpack compilation
   * @param publicPath - asset publicPath
   *
   * @public
   */
  public constructor(
    public compilation: Webpack.Compilation,
    public assets: Entry,
    public publicPath: string,
  ) {}

  /**
   * Get compiled asset file contents
   *
   * @param file - asset file
   * @returns - asset file contents
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public getCompiledAsset(file: string) {
    const raw =
      this.compilation.assets[file.replace(this.publicPath, '')]?.source()

    return raw instanceof Buffer ? raw.toString() : raw
  }

  /**
   * Reduce an entrypoint entry to inline markup
   *
   * @param emittedHtml - emitted html
   * @param entrypoint - entrypoint tuple [filetype, files]
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public inlineReducer(
    emittedHtml: string,
    [type, files]: [string, Array<string>],
  ): string {
    const reducer =
      type === 'js'
        ? this.scriptReducer
        : type === 'css'
        ? this.styleReducer
        : () => emittedHtml

    return files.reduce(reducer, emittedHtml)
  }

  /**
   * Reduce an entrypoint css filename to inline markup
   *
   * @param emittedHtml - emitted html
   * @param file - filename
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public styleReducer(emittedHtml: string, file: string): string {
    return `${emittedHtml}<link rel="stylesheet" href="${file}" />\n`
  }

  /**
   * Reduce an entrypoint js filename to inline markup
   *
   * @param emittedHtml - emitted html
   * @param file - filename
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public scriptReducer(a: string, file: string): string {
    if (file.includes('runtime')) {
      return `${a}\n<script>\n${this.getCompiledAsset(file)}\n</script>\n`
    }

    return `${a}<script src="${file}" type="defer"></script>\n`
  }

  /**
   * Reduce entrypoint assets to inline markup
   *
   * @param emittedHtml - emitted html
   * @param assets - Entrypoint records
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public emitHtmlTags(): void {
    Object.entries(this.assets).map(([name, asset]) => {
      Object.assign(this.compilation.assets, {
        [`${name}.html`]: new sources.RawSource(
          Object.entries(asset).reduce(this.inlineReducer, ``),
        ),
      })
    })
  }
}
