import type {Entrypoints} from '@roots/entrypoints-webpack-plugin'

import {bind} from 'helpful-decorators'
import Webpack from 'webpack'

/**
 * Emits inline html for each entrypoint
 *
 * @param compilation - Webpack compilation instance
 * @param publicPath - public path for entrypoints
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
    public assets: Webpack.Compilation[`assets`],
    public entrypoints: Entrypoints,
    public publicPath: string,
  ) {}

  /**
   * Reduce entrypoint entrypoints to markup
   */
  @bind
  public emit(): void {
    ;[...this.entrypoints.entries()].map(([name, entrypoint]) => {
      this.compilation.emitAsset(
        `${name}.html`,
        new Webpack.sources.RawSource(
          [...entrypoint.entries()].reduce(this.entrypointsReducer, ``),
        ),
      )
    })
  }

  /**
   * Reduce an entrypoint entry to markup
   */
  @bind
  public entrypointsReducer(
    acc: string,
    [type, files]: [string, Set<string>],
  ): string {
    if ([`js`, `mjs`].includes(type))
      return [...files].reduce(this.scriptReducer, acc)
    if (type === `css`) return [...files].reduce(this.styleReducer, acc)

    return acc
  }

  /**
   * Get compiled asset file contents
   *
   * @param file - asset file
   * @returns - asset file contents
   */
  @bind
  public getCompiledAsset(file: string) {
    const raw = this.assets[file.replace(this.publicPath, ``)]?.source()
    return raw instanceof Buffer ? raw.toString() : raw
  }

  /**
   * Reduce a js filename to markup
   */
  @bind
  public makeScript(
    attributes: Record<string, boolean | string>,
    inner: null | string = ``,
  ): string | undefined {
    if (typeof inner !== `string`) return
    inner = inner ? `\n\t${inner}\n` : ``

    const stringyAttributes = attributes
      ? Object.entries(attributes)
          .filter(([, v]) => typeof v !== `undefined` && v !== false)
          .map(([k, v]) => (v === true ? k : `${k}=${v}`))
          .reduce((acc: Array<string>, v: string) => [...acc, v], [])
          .filter(Boolean)
          .join(` `)
      : ``

    return `<script ${stringyAttributes}>${inner}</script>`
  }

  /**
   * Reduce a script from entry item to markup
   */
  @bind
  public scriptReducer(acc: string, src: string): string {
    const attributes: Record<string, boolean | string> = {
      async: true,
      defer: true,
      src: !src.includes(`runtime`) ? src : false,
      type: src.endsWith(`.mjs`) ? `module` : false,
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
   * Reduce a stylesheet from entry item to markup
   */
  @bind
  public styleReducer(acc: string, file: string): string {
    return [acc, `<link rel=stylesheet href=${file} />`].join(`\n`)
  }
}
