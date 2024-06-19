import type {Bud, Item, Items} from '@roots/bud-framework'

import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  dependsOnOptional,
  expose,
  label,
} from '@roots/bud-framework/extension/decorators'
import noop from '@roots/bud-support/noop'

import {type BudSassApi, BudSassOptions} from './options.js'

/**
 * Sass configuration
 */
@label(`@roots/bud-sass`)
@dependsOnOptional([`@roots/bud-postcss`])
@expose(`sass`)
export class BudSass extends BudSassOptions {
  public loaderPath?: false | string

  /**
   * {@link Extension.register}
   */
  @bind
  public override async register({hooks}: Bud) {
    /* Source loader */
    this.loaderPath = await this.resolve(`sass-loader`, import.meta.url)
    if (!this.loaderPath) return this.logger.error(`sass-loader not found`)

    // Set loader alias
    hooks.on(`build.resolveLoader.alias`, this.onBuildResolveLoaderAlias)
    // Resolve .sass and .scss extensions
    hooks.on(`build.resolve.extensions`, this.onBuildResolveExtensions)

    /* Source sass implementation */
    const implementation = await this.import(`sass`, import.meta.url, {
      raw: true,
    }).catch(noop)

    if (!implementation) {
      return this.logger.warn(
        `sass implementation not explicitly resolvable. falling back on default implementation.`,
      )
    }

    this.setImplementation(
      `info` in implementation ? implementation : implementation.default,
    )
  }

  /**
   * {@link Extension.boot}
   */
  @bind
  public override async boot({build, extensions, postcss}: Bud) {
    build
      .setLoader(`sass`, `sass-loader`)
      .setItem(`sass`, {
        loader: `sass`,
        options: this.getOptions,
      })
      .setRule(`sass`, {
        include: [({path}) => path(`@src`)],
        test: ({hooks}) => hooks.filter(`pattern.sass`),
      })
      .setRule(`sass-module`, {
        include: [({path}) => path(`@src`)],
        test: ({hooks}) => hooks.filter(`pattern.sassModule`),
      })

    build.rules.sass.setUse(this.withSassLoader)
    build.rules[`sass-module`].setUse(this.withSassLoader)

    if (postcss?.setSyntax) {
      postcss.setSyntax(`postcss-scss`)

      extensions.add(
        await this.import(`@roots/bud-sass/resolve-url`, import.meta.url),
      )
    }
  }

  /**
   * Import a partial globally
   *
   * @remarks
   * Used to import a partial globally (such as a `variables.scss` file)
   *
   * @example
   * With a single module signifier:
   * ```ts
   * bud.sass.importGlobal('styles/variables.scss')
   * ```
   *
   * @example
   * With an array of module signifiers:
   * ```ts
   * bud.sass.importGlobal([
   *  'styles/variables.scss',
   *  'styles/mixins.scss',
   * ])
   * ```
   *
   * @see {@link options.additionalData}
   */
  @bind
  public importGlobal(data: Array<string> | string): this {
    const globals = (Array.isArray(data) ? data : [data])
      .map(str => str.trim())
      .filter(Boolean)
      .map(item => `@import "${item}";`)

    return this.registerGlobal(globals)
  }

  /**
   * Register global stylsheet
   *
   * @remarks
   * Used to register styles which are included globally
   *
   * @example
   * ```ts
   * bud.sass.registerGlobal(`$primary-color: #ff0000;`)
   * ```
   *
   * @see {@link Options.additionalData}
   */
  @bind
  public registerGlobal(additionalData: Array<string> | string): this {
    this.setAdditionalData((data = ``) => {
      const processedString = (
        Array.isArray(additionalData) ? additionalData : [additionalData]
      )
        .map(str => str.trim())
        .filter(Boolean)
        .join(`\n`)

      return [data, processedString].join(``)
    })

    return this
  }

  /**
   * Callback for {@link Bud.hooks} `build.resolveLoader.alias`
   */
  @bind
  public onBuildResolveLoaderAlias(aliases: Record<string, string> = {}) {
    if (!this.loaderPath) return aliases

    aliases[`sass-loader`] = this.loaderPath

    return aliases
  }

  @bind
  public onBuildResolveExtensions(extensions: Set<string> = new Set()) {
    extensions.add(`.sass`)
    extensions.add(`.scss`)

    return extensions
  }

  @bind
  public withSassLoader(
    use: Array<Item | keyof Items> = [],
  ): Array<Item | keyof Items> {
    use.push(`sass`)
    return use
  }
}

export {type BudSassApi}
