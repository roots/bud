import type {Bud} from '@roots/bud-framework'

import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  dependsOn,
  expose,
  label,
} from '@roots/bud-framework/extension/decorators'
import isString from '@roots/bud-support/lodash/isString'
import {join} from 'node:path'

import {
  BudTailwindOptionsApi,
  type BudTailwindOptionsPublicInterface,
} from './options.js'

/**
 * TailwindCSS configuration
 */
@label(`@roots/bud-tailwindcss`)
@dependsOn([`@roots/bud-postcss`])
@expose(`tailwind`)
class BudTailwindCss extends BudTailwindOptionsApi {
  /**
   * {@link Extension.boot}
   */
  @bind
  public override async boot(bud: Bud) {
    if (!bud.postcss) {
      throw new Error(
        `@roots/bud-postcss is required to run @roots/bud-tailwindcss`,
      )
    }

    bud.postcss
      .setPlugin(
        `nesting`,
        await this.resolve(
          join(`tailwindcss`, `nesting`, `index.js`),
          import.meta.url,
        ),
      )
      .setPlugin(`tailwindcss`, [
        await this.resolve(`tailwindcss`, import.meta.url),
        this.configPath ?? this.config,
      ])
      .setPluginOptions(`env`, {
        features: {
          [`nesting-rules`]: false,
        },
      })
      .use([`import`, `nesting`, `tailwindcss`, `env`])

    this.logger.success(`postcss configured for tailwindcss`)

    /**
     * Add tailwind config to webpack cache dependencies
     */
    bud.hooks.on(`build.cache.buildDependencies`, paths => {
      if (isString(this.configPath)) {
        paths.tailwind = [this.configPath]
        this.logger.success(
          `tailwind config added to webpack build dependencies`,
        )
      }

      return paths
    })
  }

  @bind
  public override async configAfter(bud: Bud) {
    this.setResolvedConfig(this.resolveConfig())
    bud.postcss.setPluginOptions(
      `tailwindcss`,
      this.configPath ?? (this.config as any),
    )
  }

  /**
   * {@link Extension.register}
   */
  @bind
  public override async register(_bud: Bud) {
    await this.sourceConfig()
  }
}

export {BudTailwindCss, type BudTailwindOptionsPublicInterface}
