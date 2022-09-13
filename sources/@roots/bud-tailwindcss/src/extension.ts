import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  dependsOnOptional,
  expose,
  label,
  options,
} from '@roots/bud-framework/extension/decorators'
import {execa} from 'execa'
import {isUndefined} from 'lodash-es'
import {basename} from 'node:path'

/**
 * TailwindCSS support for `@roots/bud`
 *
 * @public
 * @decorator `@label`
 * @decorator `@dependsOn`
 */
@label(`@roots/bud-tailwindcss`)
@dependsOnOptional([`@roots/bud-postcss`])
@options({useCLI: false})
@expose(`tailwindcss`)
export default class BudTailwindCss extends Extension {
  @bind
  public async useCLI(arg?: string | boolean) {
    this.setOption(`useCLI`, isUndefined(arg) ? true : arg)
  }

  /**
   * `configAfter` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async configAfter() {
    if (this.getOption(`useCLI`)) {
      this.app.extensions
        .get(`clean-webpack-plugin`)
        .setOption(`cleanOnceBeforeBuildPatterns`, [`!tailwind.css`])

      this.app.build.rules.css?.setUse([`precss`])
      this.app.build.rules.cssModule?.setUse([`precss`])

      const src: string =
        typeof this.getOption(`useCLI`) === `string`
          ? this.getOption(`useCLI`)
          : `tailwind.css`

      this.app.hooks.action(`build.after`, async () => {
        const command = execa(
          `npx`,
          [
            `tailwindcss`,
            `-i`,
            this.app.path(`@src`, src),
            `-o`,
            this.app.path(`@dist`, `css`, basename(src)),
            this.app.isDevelopment ? `-w` : ``,
          ].filter(Boolean),
        )

        command.stdout?.pipe(this.app.context.stdout)
        command.stderr?.pipe(this.app.context.stderr)

        await command
      })

      return
    }

    try {
      const tailwindcss = await this.resolve(`tailwindcss`)
      const nesting = await this.resolve(`tailwindcss/nesting/index.js`)

      this.app.postcss.setPlugins({nesting, tailwindcss})

      this.logger.success(`postcss configured for tailwindcss`)
    } catch (message) {
      this.logger.error(message)
    }
  }
}
