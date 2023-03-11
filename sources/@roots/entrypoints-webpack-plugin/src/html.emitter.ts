import {bind} from 'helpful-decorators'
import Webpack from 'webpack'

import type {Entry} from './webpack.plugin.js'

/**
 * Emits inline html for each entrypoint
 *
 * @param compilation - Webpack compilation instance
 * @param publicPath - public path for assets
 */
export class HtmlEmitter {
  /**
   * Class constructor
   *
   * @param compilation - webpack compilation
   * @param publicPath - asset publicPath
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
   */
  @bind
  public getCompiledAsset(file: string) {
    const raw =
      this.compilation.assets[file.replace(this.publicPath, ``)]?.source()

    return raw instanceof Buffer ? raw.toString() : raw
  }

  /**
   * Reduce an entrypoint entry to markup
   */
  @bind
  public entrypointsReducer(
    acc: string,
    [type, files]: [string, Array<string>],
  ): string {
    if ([`js`, `mjs`].includes(type))
      return files.reduce(this.scriptReducer, acc)

    if (type === `css`) return files.reduce(this.styleReducer, acc)

    return acc
  }

  /**
   * Reduce a stylesheet from entry item to markup
   */
  @bind
  public styleReducer(acc: string, file: string): string {
    return [acc, `<link rel="stylesheet" href="${file}" />`].join(`\n`)
  }

  /**
   * Reduce a script from entry item to markup
   */
  @bind
  public scriptReducer(acc: string, src: string): string {
    const attributes: Record<string, boolean | string> = {
      type: src.endsWith(`.mjs`) ? `module` : false,
      src: !src.includes(`runtime`) ? src : false,
      defer: true,
      async: true,
    }

    return [
      acc,
      this.makeScript(
        attributes,
        src.includes(`runtime`) ? this.getCompiledAsset(src) : null,
      ),
    ].join(`\n`)
  }

  /**
   * Reduce a js filename to markup
   */
  @bind
  public makeScript(
    attributes: Record<string, boolean | string>,
    inner: string = ``,
  ): string {
    inner = inner ? `\n\t${inner}\n` : ``

    const stringyAttributes = attributes
      ? Object.entries(attributes)
          .filter(([, v]) => typeof v !== `undefined` && v !== false)
          .map(([k, v]) => (v === true ? k : `${k}="${v}"`))
          .reduce((acc, v) => [...acc, v], [])
          .filter(Boolean)
          .join(` `)
      : ``

    return `<script ${stringyAttributes}>${inner}</script>`
  }

  /**
   * Reduce entrypoint assets to markup
   */
  @bind
  public emit(): void {
    Object.entries(this.assets).map(([name, asset]) => {
      Object.assign(this.compilation.assets, {
        [`${name}.html`]: new Webpack.sources.RawSource(
          Object.entries(asset).reduce(this.entrypointsReducer, ``),
        ),
      })
    })
  }
}
