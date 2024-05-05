import type {Bud} from '@roots/bud-framework'

import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  dependsOn,
  dependsOnOptional,
  expose,
  label,
} from '@roots/bud-framework/extension/decorators'
import noop from '@roots/bud-support/lodash/noop'

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
  public override async boot({build, postcss}: Bud) {
    postcss.setSyntax && postcss.setSyntax(`postcss-scss`)

    build.rules.sass.setUse([
      `precss`,
      `css`,
      `postcss`,
      `resolve-url`,
      `sass`,
    ])
  }

  /**
   * {@link Extension.register}
   */
  @bind
  public override async register({build, hooks, path}: Bud) {
    /* Source loader */
    const loader = await this.resolve(`sass-loader`, import.meta.url)
    if (!loader) return this.logger.error(`sass-loader not found`)

    /* Source sass implementation */
    const implementation = await this.import(`sass`, import.meta.url, {
      raw: true,
    }).catch(noop)

    if (!implementation) {
      this.logger.warning(
        `sass implementation not explicitly resolvable. falling back on default implementation.`,
      )
    } else if (`info` in implementation) {
      this.setImplementation(implementation)
      this.logger.info(
        `sass implementation set (import * as sass)`,
        this.getImplementation()?.info,
      )
    } else if (`default` in implementation) {
      this.setImplementation(implementation.default)
      this.logger.info(
        `sass implementation set (import default)`,
        this.getImplementation()?.info,
      )
    }
    /* Set loader alias */
    hooks.on(`build.resolveLoader.alias`, (aliases = {}) => ({
      ...aliases,
      [`sass-loader`]: loader,
    }))

    /* Resolve .scss and .sass extensions */
    hooks.on(`build.resolve.extensions`, (ext = new Set()) =>
      ext.add(`.scss`).add(`.sass`),
    )

    /* .scss */
    build
      .setLoader(`sass`, `sass-loader`)
      .setItem(`sass`, {
        loader: `sass`,
        options: () => this.options,
      })
      .setRule(`sass`, {
        include: [({path}) => path(`@src`)],
        test: ({hooks}) => hooks.filter(`pattern.sass`),
        use: [`precss`, `css`, `postcss`, `resolve-url`, `sass`],
      })

    /* .module.scss */
    build.setRule(`sass-module`, {
      include: [({path}) => path(`@src`)],
      test: ({hooks}) => hooks.filter(`pattern.sassModule`),
      use: [`precss`, `css-module`, `postcss`, `resolve-url`, `sass`],
    })
  }
}

export {type BudSassApi}
