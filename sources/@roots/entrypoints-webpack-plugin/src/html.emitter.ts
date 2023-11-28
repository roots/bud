import type {Entrypoints} from '@roots/entrypoints-webpack-plugin'

import {Buffer} from 'node:buffer'

import {bind} from 'helpful-decorators'
import Webpack from 'webpack'

/**
 * Emits inline html for each entrypoint
 */
export class HtmlEmitter {
  /**
   * Class constructor
   *
   * @param compilation - webpack compilation
   * @param assets - webpack compilation assets
   * @param entrypoints - {@link Entrypoints}
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
   *
   * @returns void
   * @decorator bind - {@link bind}
   */
  @bind
  public emit(): void {
    ;[...this.entrypoints.entries()].map(([name, entrypoint]) => {
      this.compilation.emitAsset(
        `${name}.html`,
        new Webpack.sources.RawSource(
          [...entrypoint.entries()].reduce((html, [extension, files]) => {
            if ([`js`, `mjs`].includes(extension))
              return [...files].reduce(this.scriptReducer, html)

            if (extension === `css`)
              return [...files].reduce(this.styleReducer, html)

            return html
          }, ``),
        ),
      )
    })
  }

  /**
   * Get compiled asset file contents
   *
   * @param ident - asset module name
   * @returns - asset file contents
   */
  @bind
  public getCompiledAsset(ident: string) {
    const raw = this.assets[ident.replace(this.publicPath, ``)]?.source()
    return raw instanceof Buffer ? raw.toString() : raw
  }

  /**
   * Reduce a js filename to markup
   */
  @bind
  public makeScript(
    attributeRecords: Record<string, boolean | string | undefined>,
    inner: null | string = ``,
  ): string | undefined {
    inner = inner ? `\n\t${inner}\n` : ``

    const attributes = attributeRecords
      ? Object.entries(attributeRecords)
          .filter(([_, v]) => v !== undefined)
          .map(([k, v]) => {
            // html5 specification allows for omitting value for boolean attributes
            if (v === true) return k
            return `${k}=${v}`
          })
          .filter(Boolean)
          .join(` `)
      : ``

    return `<script ${attributes}>${inner}</script>`
  }

  /**
   * Reduce a script from entry item to markup
   */
  @bind
  public scriptReducer(acc: string, src: string): string {
    const attributes: Record<string, boolean | string | undefined> = {
      async: true,
      defer: true,
      src: !src.includes(`runtime`) ? src : undefined,
      type: src.endsWith(`.mjs`) ? `module` : undefined,
    }

    return [
      acc,
      this.makeScript(
        attributes,
        src.includes(`runtime`) ? this.getCompiledAsset(src) : undefined,
      ),
    ].join(`\n`)
  }

  /**
   * Reduce a stylesheet from entry item to markup
   */
  @bind
  public styleReducer(acc: string, href: string): string {
    return [acc, `<link rel=stylesheet href=${href} />`].join(`\n`)
  }
}
