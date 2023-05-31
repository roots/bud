import {join} from 'node:path'

import type {Bud} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  dependsOn,
  expose,
  label,
} from '@roots/bud-framework/extension/decorators'
import isString from '@roots/bud-support/lodash/isString'

import {
  BudTailwindConfig,
  type BudTailwindOptionsPublicInterface,
} from './config.js'

/**
 * TailwindCSS configuration
 */
@label(`@roots/bud-tailwindcss`)
@dependsOn([`@roots/bud-postcss`])
@expose(`tailwind`)
class BudTailwindCss extends BudTailwindConfig {
  /**
   * {@link Extension.register}
   */
  @bind
  public override async register() {
    await this.sourceConfig()
  }

  /**
   * {@link Extension.buildBefore}
   */
  @bind
  public override async buildBefore(bud: Bud) {
    bud.postcss.setPluginOptions(`tailwindcss`, this.config)
    this.logger.info(`final config`, JSON.stringify(this.config, null, 2))
  }

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
        this.config,
      ])
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
}

export {BudTailwindCss, type BudTailwindOptionsPublicInterface}
