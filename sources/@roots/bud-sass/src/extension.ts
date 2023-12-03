import type {Bud} from '@roots/bud-framework'

import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  dependsOn,
  dependsOnOptional,
  expose,
  label,
} from '@roots/bud-framework/extension/decorators'
import isBoolean from '@roots/bud-support/lodash/isBoolean'

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
    if (postcss.setSyntax) postcss.setSyntax(`postcss-scss`)

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
    /** Source loader */
    const loader = await this.resolve(`sass-loader`, import.meta.url)
    if (!loader) return this.logger.error(`sass-loader not found`)

    /** Source sass implementation */
    const implementation = await this.import(`sass`, import.meta.url, {
      raw: true,
    })
    if (!implementation) {
      return this.logger.error(`sass not found`)
    }

    if (implementation.info) {
      this.setImplementation(implementation)
      this.logger.info(
        `sass implementation set (import * as sass)`,
        this.getImplementation()?.info,
      )
    } else if (!implementation.info && implementation.default) {
      this.setImplementation(implementation.default)
      this.logger.info(
        `sass implementation set (import default)`,
        this.getImplementation()?.info,
      )
    } else {
      this.logger.warning(
        `sass implementation not explicitly resolvable. falling back on default implementation.`,
      )
    }

    /** Set loader alias */
    hooks.on(`build.resolveLoader.alias`, (aliases = {}) => ({
      ...aliases,
      [`sass-loader`]: loader,
    }))

    /** Resolve .scss and .sass extensions */
    hooks.on(`build.resolve.extensions`, (ext = new Set()) =>
      ext.add(`.scss`).add(`.sass`),
    )

    /** .scss */
    build
      .setLoader(`sass`, `sass-loader`)
      .setItem(`sass`, {
        loader: `sass`,
        options: () => this.options,
      })
      .setRule(`sass`, {
        include: [({path}) => path(`@src`)],
        test: ({hooks}) => hooks.filter(`pattern.sass`),
      })

    /** .module.scss */
    build
      .setItem(`sass-module`, {
        loader: `css`,
        options: {
          importLoaders: 3,
          sourceMap: isBoolean(hooks.filter(`build.devtool`, false))
            ? hooks.filter(`build.devtool`, false)
            : true,
        },
      })
      .setRule(`sass-module`, {
        include: [({path}) => path(`@src`)],
        test: ({hooks}) => hooks.filter(`pattern.sassModule`),
        use: [`precss`, `sass-module`, `postcss`, `resolve-url`, `sass`],
      })

    /** issuer rules */
    hooks.on(`build.module.rules.oneOf`, (rules = []) => [
      {
        exclude: [path(`@src`)],
        issuer: {not: hooks.filter(`pattern.sassModule`)},
        test: hooks.filter(`pattern.sassModule`),
        use: build.rules[`sass-module`]?.toWebpack?.().use,
      },
      {
        exclude: [path(`@src`)],
        issuer: {not: hooks.filter(`pattern.sass`)},
        test: hooks.filter(`pattern.sass`),
        use: build.rules.sass.toWebpack?.().use,
      },
      ...rules,
    ])
  }
}

export {type BudSassApi}
