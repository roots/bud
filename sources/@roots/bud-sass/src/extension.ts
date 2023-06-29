import type {Bud} from '@roots/bud-framework'

import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  dependsOn,
  dependsOnOptional,
  expose,
  label,
} from '@roots/bud-framework/extension/decorators'

import {type BudSassApi, BudSassOptions} from './options.js'

/**
 * Sass configuration
 */
@label(`@roots/bud-sass`)
@dependsOn([`@roots/bud-sass/resolve-url`])
@dependsOnOptional([`@roots/bud-postcss`])
@expose(`sass`)
export class BudSass extends BudSassOptions {
  /**
   * {@link Extension.boot}
   */
  @bind
  public override async boot({build, postcss}) {
    postcss?.setSyntax(`postcss-scss`)
    build.rules.sass.setUse(() =>
      [
        build.items[`precss`],
        build.items[`css`],
        build.items[`postcss`],
        build.items[`resolve-url`],
        build.items[`sass`],
      ].filter(Boolean),
    )
  }

  /**
   * {@link Extension.register}
   */
  @bind
  public override async register({build, hooks}: Bud) {
    /** Source loader */
    const loader = await this.resolve(`sass-loader`)
    if (!loader) return this.logger.error(`sass-loader not found`)

    /** Source sass implementation */
    const implementation = await this.import(
      `sass`,
      import.meta.url,
      false,
    )
    if (!implementation) {
      return this.logger.error(`sass not found`)
    }
    this.setImplementation(implementation)

    /** Set loader alias */
    hooks.on(`build.resolveLoader.alias`, (aliases = {}) => ({
      ...aliases,
      [`sass-loader`]: loader,
    }))

    /** Resolve .scss and .sass extensions */
    hooks.on(`build.resolve.extensions`, ext =>
      ext.add(`.scss`).add(`.sass`),
    )

    /** Setup rule */
    build
      .setLoader(`sass`, `sass-loader`)
      .setItem(`sass`, {
        ident: `sass`,
        loader: `sass`,
        options: () => this.options,
      })
      .setRule(`sass`, {
        include: [({path}) => path(`@src`)],
        test: ({hooks}) => hooks.filter(`pattern.sass`),
      })
  }
}

export {type BudSassApi}
