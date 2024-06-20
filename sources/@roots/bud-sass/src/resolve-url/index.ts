import type {Bud, Items} from '@roots/bud-framework'
import type {Item} from '@roots/bud-framework/services/build'

import {DynamicOption, Extension} from '@roots/bud-framework/extension'
import {
  bind,
  label,
  options,
} from '@roots/bud-framework/extension/decorators'

/**
 * resolve-url-loader configuration
 */
@label(`@roots/bud-sass/resolve-url`)
@options({
  root: DynamicOption.make(({path}: Bud) => path(`@src`)),
  sourceMap: true,
})
export default class BudResolveUrl extends Extension {
  public loaderPath?: false | string

  /**
   * {@link Extension.register}
   */
  @bind
  public override async register({build, hooks, path}: Bud) {
    /** Source loader */
    this.loaderPath = await this.resolve(
      `resolve-url-loader`,
      import.meta.url,
    )
    if (!this.loaderPath)
      return this.logger.error(`resolve-url-loader not found`)

    /** Set loader alias */
    hooks.on(`build.resolveLoader.alias`, this.onBuildResolveLoaderAlias)

    /** Setup rule */
    build
      .setLoader(`resolve-url`, this.loaderPath)
      .setItem(`resolve-url`, {
        loader: `resolve-url`,
        options: this.getOptions,
      })
  }

  /**
   * {@link Extension.boot}
   */
  @bind
  public override async boot({build}: Bud) {
    build.rules.sass.setUse(this.withResolveLoader)
    build.rules[`sass-module`].setUse(this.withResolveLoader)
  }

  /**
   * Callback for {@link Bud.hooks} `build.resolveLoader.alias`
   */
  @bind
  public onBuildResolveLoaderAlias(aliases: Record<string, string> = {}) {
    if (!this.loaderPath) return aliases

    aliases[`resolve-url-loader`] = this.loaderPath
    return aliases
  }

  @bind
  public withResolveLoader(
    use: Array<Item | keyof Items>,
  ): Array<Item | keyof Items> {
    if (!this.loaderPath) return use

    const index = use.findIndex(
      item =>
        (typeof item === `string` && item.includes(`postcss`)) ||
        (typeof item === `object` && item.ident?.includes(`postcss`)),
    )

    if (!(index > 0)) return use

    return [
      ...use.slice(0, index + 1),
      `resolve-url`,
      ...use.slice(index + 1),
    ]
  }
}
