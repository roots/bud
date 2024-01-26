import type {Bud} from '@roots/bud-framework'

import {join} from 'node:path'

import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  dependsOn,
  expose,
  label,
} from '@roots/bud-framework/extension/decorators'
import isString from '@roots/bud-support/isString'

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
      return this.catch(
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

  /**
   * {@link Extension.configAfter}
   */
  @bind
  public override async configAfter(bud: Bud) {
    bud.postcss.setPluginOptions(`tailwindcss`, this.resolveConfig())
  }

  /**
   * {@link Extension.register}
   */
  @bind
  public override async register() {
    await this.sourceConfig()
  }
}

export {BudTailwindCss, type BudTailwindOptionsPublicInterface}
